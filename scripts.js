console.log('attached')

var id = 1;

var Blog = Backbone.Model.extend({
    defaults:{
        task:'',
        priority:'low',
        added : ''
    }

});
let createobj = (task,priority,added) => {
    id=id+1;
    return new Blog({
        id:id-1,"task":task,"priority":priority,"added":added
    })
}

var BlogCollection = Backbone.Collection.extend({
    model : Blog
});

var allblogs = new BlogCollection();

let add_to_collection = (obj) =>  allblogs.add(obj);


let ElementView = Backbone.View.extend({
    tagName:"li",
    events:{
        "click":"delete"
    },
    delete: function(){
        removeTask(this.model.get('id'))
    },
    render : function() {
        this.$el.html(this.model.get('task') +'<button>delete</button>');
        return this;
    }
});

let ListView = Backbone.View.extend({
    render:function(){
        this.$el.empty()
        let self = this;
        this.model.each(task => {
            var element = new ElementView({model:task})
            self.$el.append(element.render().$el)
        })
    }

})

let test_collection = new BlogCollection([
])

var view = new ListView({el : "#test", model : test_collection});


const addTask = (task,priority,added) => {
    test_collection.add(createobj(task,priority,added));
    view.render();
}

const removeTask = (id) => {
    test_collection.remove(id);
    view.render();
}

const fromui = () =>{
    console.log(document.getElementById("task").value);
    addTask(document.getElementById("task").value,"low",new Date());
}


