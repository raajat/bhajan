
# Why a new seed ? If there exists millions of seed in market ?
# Every organisation have its own way of working. And we have decided to create a seed where our developer will be more comfortable to use and it also ease the maintainbility of the projects. IDE like webstorm is providing functionality about generating controllers , services and so on. But its bound the user to a fix javascript design pattern.

#About the Seed
#We have used layered express module available at https://github.com/dave-elkan/layered-express which is compatible with Express 3.0. We have made minor changes to it  and make it compatible for Express 4.0.



# in this seed we have added url base (action base )  authenication in node only those people who have access authority to get particular action done , he can only access the api.



#Directory Structure

# 1. application [Directory]

 # It has all the layers of the application Controller , Services and Views. Controllers and Services resides in controller-service-layer and it was automatically binded to routes at the time of application boot.

 #Views decides the response type depending upon content-type of request.

 # 2. configurations [Directory]


  #Insides configurations deirectory resides following files

  # a. ApplicationMessages - A file that will contain all kind of message error and success. Change at one place and reflect at every place.

  # b. BootStrap - A file contains all the functions that should run at the boot time.

  # c. Conf - A file that contains constant of application like port, email configurations , roles etc

  # d. DependencyInclude - File contains all the dependecies used in the project

  # e. UrlMapping - File which decides for which url , which controller and which acction will be called.

  # 3. application-middleware [Directory]

  # Directory which will contain all the custom middleware used in the project.

  # 4. application-utility [Directory]
  # Contains all the utility functions like mail sending , aws upload etc.
