jnc
===============================

Jupyter Notification Center

Installation
------------

To install use pip:

    $ pip install jnc
    $ jupyter nbextension enable --py --sys-prefix jnc


For a development installation (requires npm),

    $ git clone https://github.com//jnc.git
    $ cd jnc
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix jnc
    $ jupyter nbextension enable --py --sys-prefix jnc
