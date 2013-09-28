if [ `pgrep java` ]; then
	/etc/init.d/uportal stop
fi
#mvn clean package && cp target/EntropicMusic.war $TOMCAT_HOME/webapps
mvn tomcat:redeploy &&
/etc/init.d/uportal start
