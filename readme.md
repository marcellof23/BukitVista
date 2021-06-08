### Requirements
<ul>
<li>Node js with version above or equal 14</li> 
<li>Npm</li> 
<li>Mysql</li> 
<li>Postman (Recommended)</li> 
<li>Nodemon (Recommended install globally)</li> 
<li>And all other dependecies can be installed via package.json</li>
</ul>


### How To Start
<ul>
<li>Clone this reporsitory
<li>then npm install</li>
<li>after installation, run with command nodemon server</li>
<li>Use API /api/regist to create new user</li>
<li>Use API /api/signin to get bearer token</li>
<li>Use API get /movies/favorite to get all users favorite movies</li>
<li>Use API post /movies/favorite to insert users new favorite movies</li>
<li>Use API post /movies/:movie_title to fetch all poster url of movie by title</li>
<li>Use API post /movies is forbidden </li>
<li>If there is some problem while run nodemon server, delete node_modules then run npm update</li>
</ul>

### How To Use the API
<ul>
<li>Open Postman</li>
<li>Use API /api/regist to insert user to database</li>
<li>Use API /api/signin to get bearer token from POSTMAN response at the body</li>
<li>Put the bearer token into Authorization -> Type Bearer Token -> Paste to token form</li>
<li>Now you can use all api and fill the body with models schema</li>
</ul>

## Example Body in /api/regist and output 

```shell
Input : 
{
    "user_id" : 125,
    "name" : "hei",
    "password" : "hei"
}
Output 
{
    "user_id": 125,
    "name": "hei",
    "password": "$2b$10$yUf6T3SCnFi9Z4ik/LHA8.AiKpdG2odZ/Oz/xGtkes1bUDFlQPOYG",
    "updatedAt": "2021-06-08T12:06:49.309Z",
    "createdAt": "2021-06-08T12:06:49.309Z"
}
```
## Emample Body in /api/signin and output
## Copy the "token" below to access the api by inserting to bearer token at postman
``` shell
{
    "user_id" : 128,
    "name" : "testing",
    "password" : "testing"
}
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjgsIm5hbWUiOiJhc2VtIiwiaWF0IjoxNjIzMTU0MzcxLCJleHAiOjE2MjMxNTc5NzF9.Cxw075Vxs88u4ZvB-V9KlcHPBEaCHPX8yruA6wu4l-o",
    "expiresIn": 3600,
    "msg": {
        "user_id": 128,
        "name": "testing",
        "password": "$2b$10$5QVEH27KYrd/f8Rv2yCQqur1lRNr3fM87yf3gpHSNWdI1LSGDcMyu",
        "createdAt": "2021-06-08T12:12:38.000Z",
        "updatedAt": "2021-06-08T12:12:38.000Z"
    }
}
```
## Example Body in /movies/favorite

```shell
{
    "id" : 30,
    "title" : "tes",
    "user_id" : 125
}
```
