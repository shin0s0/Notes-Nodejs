

exports.homepage = async (req,res)=>{
    const locals= {
        title: "NOdeJs Notes",
        description: "Free Nodejs Notes App"
    }
    res.render("index", {
    locals,
    layout:"../views/layouts/front-page"
});
};

exports.about = async (req,res)=>{
    const locals= {
        title: "about - NOdeJs Notes",
        description: "Free Nodejs Notes App"
    }
    res.render("about", locals);
};