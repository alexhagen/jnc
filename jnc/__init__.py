from ._version import version_info, __version__

from .example import *
from IPython.display import display

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jnc',
        'require': 'jnc/extension'
    }]

hello_world = HelloWorld()
display(hello_world)
