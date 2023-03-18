async function connect()  {
    try {
        await mongoose.connect(
            "mongodb+srv://duoc6694:jJw8rmJmvkZzgIna@viggacv.qxmduwf.mongodb.net/ManagementSchool"
        );
        console.log('Truy cap  database thanh cong')
    } catch(error){
    console.log('Truy cap  database thanh cong')
}}

module.exports  =  {connect}