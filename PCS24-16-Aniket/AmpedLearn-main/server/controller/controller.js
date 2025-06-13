const model=require('../models/model');


//post:http://localhost:8080/api/categoriesfunction 
   async function create_Categories(req,res){
     const Create=new model.Categories({
        language:"JAVASCRIPT",
        color:'#dda0dd'
    })

    try {
        const savedCategory = await Create.save();
        return res.json(savedCategory);
    } catch (err) {
        return res.status(400).json({message:`Error ${err}`});
    }
}

//get:http://localhost:8080/api/categories
async function get_Categories(req,res){
    let data=await model.Categories.find({})

    let filter=await data.map(v=>Object.assign({},{language:v.language,color:v.color}));
    return res.json(filter);
}

//post:http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
    if (!req.body) {
        return res.status(400).json("Post HTTP data not provided");
    }
try{
    let { name, feed, language, future,add } = req.body;

    const Create = new model.Feedback({
        name,
        feed,
        language,
        future,
        date: new Date(),
        add
    });

         const savedTransaction = await Create.save();
        return res.json(savedTransaction);
    } catch (error) {
        return res.status(400).json({ message: `error ${error}` });
    }
}

//get:http://localhost:8080/api/transaction
async function get_transaction(req,res){
    let data=await model.Feedback.find({});
    return res.json(data);
}

//get:http://localhost:8080/api/labels
async function get_Labels(req,res){
    model.Feedback.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"language",
                foreignField:"language",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result=>{
        let data=result.map(v=>Object.assign({},{_id:v._id,name:v.name,feed:v.feed,language:v.language,future:v.future,color:v.categories_info['color']}));
        res.json(data)
    }).catch(error=>{
        req.status(400).json(`Looup collection error ${error}`);
    })
}

module.exports={
    create_Categories,
    get_Categories,
    create_Transaction,
    get_transaction,
    get_Labels
}