from __future__ import print_function
from __future__ import absolute_import
from __future__ import unicode_literals
from __future__ import division

from pyramid.config import Configurator
import angular_momentum.db


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.scan()

    angular_momentum.db.configure('main', settings['db.url'])

    return config.make_wsgi_app()


def postfork(server, worker):
    # Make sure any lazily initialized SQLAlchemy state, notably the
    # `returns_unicode_strings` flag on the engine's `Dialect`, is initialized
    # before we start accepting requests. Otherwise, some requests could start
    # making queries before the initialization was complete, and those queries
    # would observe the incorrect, uninitialized values for certain
    # engine/dialect state variables, leading to errors.
    angular_momentum.db.get_engine().connect().close()

    from psycogreen.gevent import patch_psycopg
    patch_psycopg()
