# yarn run i
yarn build
cp -r ./WEB-INF ../../apps/instructor/build/
ant.bat release
# ant install.modules