**Access here**: https://whats-app-44493.web.app

Real-time web-based chat application, equipped with user authentication and authorization functionalities. Enabled users to seamlessly exchange text and image-based messages, while also
providing the option to search and add friends on the platform.

**TECH STACK**
- Front-end: ReactJS utilizing ContextAPI to ensure optimal state management and effective component communication. CSS for styling an intuitive user experience. 
- Database and hosting: Firebase for efficient and stable database management and hosting with Google Authentication to provide
secure and streamlined login/registration process for users. 


**CORE FUNCTIONALITY** 

*Login/registration*: Login and password management is handled by Google Authentication (provided by Firebase). Registration involves saving the user in the database with the required email, 
profile picture and username. Images are uploded to Firebase and a downloadable URL link of the picture is saved to the corresponding profile. To ensure user stays logged in (even after a refresh), they are saved to context.

*Sending messages/images*: Each message and image input is saved to state. Upon pressing 'send' a function attached to the event handler runs. This function saves information such as: the id of users chatting, 
an id for the chat itself, timestamps for each message. This is then uploaded to Firebase before displaying. 

*Selecting a friend from sidebar*: ContextAPI is used to enable this functionality. Once the logged in user selects a friend, the friend's profile id is saved in context. 

*Search*: The username is looked up in the exisiting user database. If found, it is displayed. Once displayed, if the user clicks on the found profile, a link between the logged-in-user and the selected proifle 
is made in the database to facilitate conversation in the future. 