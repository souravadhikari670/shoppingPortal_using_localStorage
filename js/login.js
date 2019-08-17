var userArray = []
function userLogin()
{
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var flag = 0;
    var usersArray = localStorage.getItem('userArrayLocal')
    var users = JSON.parse(usersArray)
    for( i=0; i<users.length; i++)
    {   
        if(users[i].uEmail == email)
        {
            flag++
            if(users[i].uPassword == password)
            {
             sessionStorage.loggedIn = JSON.stringify([])
             var userObj = new Object()
             userObj.uId = users[i].uId
             userObj.uName = users[i].uName
             userObj.uEmail = users[i].uEmail
                userArray.push(userObj)
                sessionStorage.loggedIn = JSON.stringify(userArray)
             location.href = 'http://127.0.0.1//Create_Product/addCart.html'
            }
             else
                alert('Incorrect Password')
        }
    }if(flag == 0 )
        alert('Incorrect Email')
}