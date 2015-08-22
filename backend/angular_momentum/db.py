from __future__ import print_function
from __future__ import absolute_import
from __future__ import unicode_literals
from __future__ import division

from abc import ABCMeta, abstractmethod

from sqlalchemy import create_engine, exc, event, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import Pool

import gevent.local

class SessionManager(object):
    __metaclass__ = ABCMeta

    @abstractmethod
    def get_session(self, create=True, **Session_kwargs):
        pass

class GEventLocalSessionManager(SessionManager):
    def __init__(self, Session):
        self._Session = Session
        self._local = gevent.local.local()

    def get_session(self, create=True, **Session_kwargs):
        try:
            return self._local.session
        except AttributeError:
            if create:
                self._local.session = self._Session(**Session_kwargs)
                return self._local.session
            else:
                return None

class SingletonSessionManager(SessionManager):
    def __init__(self, Session):
        self._Session = Session
        self._session = None

    def get_session(self, create=True, **Session_kwargs):
        if self._session is not None:
            return self._session
        else:
            if create:
                self._session = self._Session(**Session_kwargs)
                return self._session
            else:
                return None

_config = {}

metadata = MetaData()

def get_session(name='main', create=True, **Session_kwargs):
    if name in _config and 'session_manager' in _config[name]:
        return _config[name]['session_manager'].get_session(create, **Session_kwargs)
    else:
        raise UnconfiguredSessionException('The database %s is not configured!' % name)

def get_session_manager(name='main'):
    return _config[name]['session_manager']

def get_engine(name='main'):
    return _config[name]['engine']

def configure(name, db_url, db_pool_size=5, session_manager_class=GEventLocalSessionManager, echo=False):
    from angular_momentum.models.base import BaseModel
    global _config
    _config[name] = {}
    _config[name]['engine'] = create_engine(db_url, pool_size=int(db_pool_size), echo=echo)

    BaseModel.metadata.bind = _config[name]['engine']
    _config[name]['Session'] = sessionmaker(bind=_config[name]['engine'])
    _config[name]['session_manager'] = session_manager_class(_config[name]['Session'])


# Avoid the use of connections that were invalidated by a database restart; see
# http://docs.sqlalchemy.org/en/rel_0_9/core/pooling.html#disconnect-handling-pessimistic
@event.listens_for(Pool, "checkout")
def ping_connection(dbapi_connection, connection_record, connection_proxy):
    cursor = dbapi_connection.cursor()
    try:
        cursor.execute("SELECT 1")
    except:
        connection_proxy._pool.dispose()
        raise exc.DisconnectionError()
    cursor.close()


class UnconfiguredSessionException(Exception):
    pass
