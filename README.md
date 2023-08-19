# HouseTable Full stack Appplication. 

This repository holds a complete full-stack application focused on managing house-related data with risk assessment. It includes a Node.js server that handles APIs, a user-friendly React-based interface, and a MySQL database for storing information.
<br>
<br>
The risk evaluation is done based on below criteria. 
1. The `risk` attribute is calculated as the ratio of `loanAmount` to `currentValue`.
2. If the `loanAmount` is more than 50% of the `currentValue`, increase the risk by an additional 10%.
3. . The `risk` should be a value between 0 and 1

## Prerequisites 
1. Install Node and NPM:   https://nodejs.org/en/download. 
   Verify if node is installed using below command 
   ```npm -v``` and ```node -v```

2. Install MySQL https://dev.mysql.com/downloads/mysql/
    Once MySQL is installed, create a database called ```house_table```


## Steps

First you need to install all the packages, to do that run the following command 
### `npm install`

Once all the package are installed, next is to run the application. The node server is starting at server.js
Run the following command to run node server 
### `node server.js ` OR  `npm start`

The server will be started at http://localhost:8080 
To check if the server is up and running, load  http://localhost:8080 in browser or postman . 
<br> If you see a message saying `Server is up and running`  then node server is up. 

### Run the UI application . 
Once we have node server up and running. Follow the steps in [ReadMe](react-client/README.md)
<br>


# Screen shots
### House Table screen when no house are added
![House page.png](images%2FHouse%20page.png)
<br>

### Add house screen
![Add House.png](images%2FAdd%20House.png)
<br>

### Risk evaluation after add of house 
![Risk Evaluation after add.png](images%2FRisk%20Evaluation%20after%20add.png)

### Edit home screen
![Edit House.png](images%2FEdit%20House.png)

### Risk evaluation after edit of the house record
![Risk Evaluation after edit.png](images%2FRisk%20Evaluation%20after%20edit.png)

### Multiple records of houses
![Multiple house entry.png](images%2FMultiple%20house%20entry.png)

**Note**: 
In the above screen , risk for ID 2 is 0.2 because the loan amount is < 50 % of the current value.
<br>
For ID 3 , the loan amount > 50% of  current value so 10 % is increased and risk is 0.77