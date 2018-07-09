if(process.env.NODE_ENV =='production'){
    module.exports={mongoURI:('mongodb://kadrikondi:kadzee222@ds129670.mlab.com:29670/kondidb')}
}else{
    module.exports= {mongoURI:('mongodb://localhost/ideadrop')}
}