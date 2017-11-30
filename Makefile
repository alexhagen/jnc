all: clean build

clean: FORCE
	sudo -H jupyter nbextension uninstall --py --sys-prefix jnc
	rm -rf jnc/static/

build: FORCE
	#mkdir -p jnc/static
	#cp js/lib/*.js jnc/static/
	python setup.py build
	pip install -e .
	sudo -H jupyter nbextension install --py --symlink --sys-prefix jnc
	sudo -H jupyter nbextension enable --py --sys-prefix jnc

FORCE:
