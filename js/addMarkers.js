AFRAME.registerComponent("create-markers", {
  
  init : async function(){

    var mainScene = document.querySelector("#main-scene")

    var dishes = await this.getDishes()
    console.log(dishes)

    dishes.map(dish=>{
      var marker = document.createElement('a-marker')

      marker.setAttribute("id",dish.id)
      marker.setAttribute("type","pattern")
      marker.setAttribute("url",dish.marker_pattern_url)
      marker.setAttribute("cursor",{rayOrigin:"mouse"})
      marker.setAttribute("markerhandler",{})

      mainScene.appendChild(marker)


      var model = document.createElement('a-entity')

      model.setAttribute("id","model-"+dish.id)
      model.setAttribute("position",dish.model_geometry.position)
      model.setAttribute("rotation",dish.model_geometry.rotation)
      model.setAttribute("scale",dish.model_geometry.scale)
      model.setAttribute("gltf-model",`url(${dish.model_url})`)
      model.setAttribute("gesture-handler",{})

      marker.appendChild(model)

      var mainPlane = document.createElement('a-plane')
      mainPlane.setAttribute("id","main-plane-"+dish.id)
      mainPlane.setAttribute("position",{x:0,y:0,z:0})
      mainPlane.setAttribute("rotation",{x:-90,y:0,z:0})
      mainPlane.setAttribute("width",1.7)      
      mainPlane.setAttribute("height",1.5)
     
      marker.appendChild(mainPlane)

      var dishTitle = document.createElement('a-entity')
      dishTitle.setAttribute("id","dish-title-"+dish.id)
      dishTitle.setAttribute("position",{x:0,y:0,z:0.1})
      dishTitle.setAttribute("rotation",{x:0,y:0,z:0})
      dishTitle.setAttribute("text",{
        font:'monoid',
        color:'black',
        width:1.8,
        height:1,
        align:'center',
        value:dish.dish_name.toUpperCase()
      })      
      
     
      mainPlane.appendChild(dishTitle)
      
      var ingredients = document.createElement('a-entity')
      ingredients.setAttribute("id","ingedients-"+dish.id)
      ingredients.setAttribute("position",{x:0.3,y:0,z:0.1})
      ingredients.setAttribute("rotation",{x:0,y:0,z:0})
      ingredients.setAttribute("text",{
        font:'monoid',
        color:'black',
        width:2,
        height:1,
        align:'left',
        value:`${dish.ingredients}.join("\n\n)`
      })      
      
     
      mainPlane.appendChild(ingredients)



      
    })
    
  },

  getDishes : async function(){

    return await firebase
    .firestore()
    .collection("dishes")
    .get()
    .then(snap=>{
      return snap.docs.map(doc=>doc.data())
    })
  }
  
  });
