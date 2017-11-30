all: clean build

clean:
	jupyter nbextension uninstall --py --sys-prefix jnc
	rm -rf jnc/static/

build:
	python setup.py build
	pip install -e .
	jupyter nbextension install --py --symlink --sys-prefix jnc
	jupyter nbextension enable --py --sys-prefix jnc
