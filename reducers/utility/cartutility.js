// exports.getValuesByKey = (arrayOfObjects, key) => {
//     if (!Array.isArray(arrayOfObjects) || !key) return [];
//     return arrayOfObjects.map(item => item[key]);
// };

// const cartUtility = (state, cartItem) => {
//     cart: state.cart.find((item, index) => {
//         if (item.item_id == cartItem.item_id) {
//             if (item?.defaultVariantItem) {
//                 if (item?.defaultVariantItem.variant_item_id == cartItem?.defaultVariantItem.variant_item_id) {
//                     let cartItemAddonIds=this.getValuesByKey(cartItem.addons,'add_on_option_id')
//                     if(this.getValuesByKey(item.addons,'add_on_option_id').equals(cartItemAddonIds)){
//                         return {...item,addons:item.addons.map(addon=>{
//                             if(this.getValuesByKey(addon,'add_on_option_id').equals(cartItemAddonIds)){
// return {...addon,qty:cartItem}
//                             }
//                             else{

//                             }
//                         })}
//                     }

//                 }
//             } else {

//             }

//         }

//     })
// }

export const addItemToCart = (cart, cartItem) => {
    let itemExist = cart?.find((item) => item.item_id == cartItem.item_id);
    console.log("carttttitem", cartItem);
  
  
    if (itemExist) {
      let data = cart.reduce((acc, item) => {
        if (item.item_id == cartItem.item_id) {
          if (item.defaultVariantItem) {
            console.log(
              "cartItem.defaultVariantItem?.variant_item_id",
              item.defaultVariantItem?.variant_item_id ==
                cartItem.defaultVariantItem?.variant_item_id
            );
            if (
              item.defaultVariantItem?.variant_item_id ==
              cartItem.defaultVariantItem?.variant_item_id
            ) {
              console.log("carttttttuuuuu");
              acc.push(cartItem);
              return acc;
            } else {
              console.log("cartttttttttttttttttt");
              acc.push(item);
              return acc;
            }
          } else {
            console.log("cartggg");
            acc.push(cartItem);
            return acc;
          }
        } else {
          acc.push(item);
          return acc;
        }
      }, []);
     
  
      console.log("returned data", data);
      return data;
    } else {
      return [...cart, cartItem];
    }
  };
  
  export const convertToAddonsArray = (cart,cartItem) => {
 
      return [...cart,cartItem]
    
  };
  
  // if (item.item_id == cartItem.item_id) {
  //     if (item.defaultVariantItem?.variant_item_id == cartItem.defaultVariantItem?.variant_item_id) {
  // console.log('carttttttuuuuu')
  //         acc.push(cartItem)
  //         return acc
  //     }
  //     else {
  //         console.log('cartttttttttttttttttt')
  
  //         acc.push(cartItem)
  //         return acc
  //     }
  // }
  // else {
  //     acc.push(item)
  //     return acc
  // }