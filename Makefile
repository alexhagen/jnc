all: clean build

clean: FORCE
	jupyter nbextension uninstall --py --sys-prefix jnc
	rm -rf jnc/static/

build: FORCE
	#mkdir -p jnc/static
	#cp js/lib/*.js jnc/static/
	python setup.py build
	pip install -e .
	jupyter nbextension install --py --symlink --sys-prefix jnc
	jupyter nbextension enable --py --sys-prefix jnc

FORCE:
