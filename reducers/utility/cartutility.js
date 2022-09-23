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
  // let itemExist = cart?.find((item) => item.item_id == cartItem.item_id);

  let index = -1;
  

  if (cartItem?.addons) {
    const itemExist = cart?.find((item, num) => {
      console.log("naviiii", item, cart);
      let variant_id;
      let cart_variant_id;

      if (cartItem?.addons && cartItem.addons.length>0) {
        variant_id = cartItem?.variantDetails?.variant_item_id;
      } else {
        variant_id == cartItem?.defaultVariantItem.variant_id;
      }

      if (item?.addons) {
        cart_variant_id = item?.variantDetails?.variant_item_id;
      } else {
        cart_variant_id == item?.defaultVariantItem?.variant_id;
      }

      if (item.item_id == cartItem.item_id) {
        if (item?.defaultVariantItem && cartItem.defaultVariantItem) {
          if (cart_variant_id == variant_id) {
            index = num;
            return true;
          } else {
            return false;
          }
        } else {
          //   setAddonCombination(selectedItem?.addons || []);
          index = num;
          return true;
        }
      } else {
        return false;
      }
    });

    console.log("carttttitem", cartItem);

    ;
    if (itemExist)
    {
        if(index>-1 && itemExist?.qty==0){
            
            cart.splice(index,1)
            return cart
        }
        else{
          

         let filteredData=cartItem?.addons?.filter(item=>{
          return item.qty>0
         })
console.log('filteredDataaaaaaaaaa',filteredData,cartItem,itemExist)

cartItem.addons=filteredData


         cart[index] = cartItem;
        }
    }
    else cart.push(cartItem);
    return cart || [];
  } else {
    const item = cartItem;
    console.log(item, "starte");
    // const inCart = state.cart.find(item => item.item.item_id === action.payload.item_id ? true : false)
    return  [...cart, { ...item, qty: 1 }]

      // cart: inCart ? state.cart.map(item => item.item.item_id === action.payload.item_id ? { ...item, qty: item.qty + 1 } : item) : [...state.cart, { item, qty: 1 }]
    
  }

  //   if (itemExist) {
  //     let data = cart.reduce((acc, item) => {
  //       // if (item.item_id == cartItem.item_id) {
  //       //   if (item.defaultVariantItem) {
  //       //     if (
  //       //       item.defaultVariantItem?.variant_item_id ==
  //       //       itemExist
  //       //     ) {
  //       //       console.log("carttttttuuuuu");
  //       //       acc.push(cartItem);
  //       //       return acc;
  //       //     } else {
  //       //       console.log("cartttttttttttttttttt");
  //       //       acc.push(item);
  //       //       return acc;
  //       //     }
  //       //   } else {
  //       //     console.log("cartggg");
  //       //     acc.push(cartItem);
  //       //     return acc;
  //       //   }
  //       // } else {
  //       //   acc.push(item);
  //       //   return acc;
  //       // }

  //       let variant_id;
  //       let cart_variant_id;

  //       if (cartItem?.addons) {
  //         variant_id = cartItem.addons[0].variant_item_id;
  //       } else {
  //         variant_id == cartItem?.defaultVariantItem.variant_id;
  //       }

  //       if (item?.addons) {
  //         cart_variant_id = item?.addons[0].variant_item_id;
  //       } else {
  //         cart_variant_id == item?.defaultVariantItem.variant_id;
  //       }

  // console.log('itemExistssss',itemExist)

  //       if (item.item_id == cartItem.item_id) {
  //         if (item?.defaultVariantItem) {
  //             
  //           if (cart_variant_id == variant_id) {
  //             acc.push(cartItem);
  //             return acc;
  //           } else {
  //             acc.push(item);
  //             acc.push(cartItem);
  //             return acc
  //           }
  //         }
  //          else {
  //           console.log("selected te", item, selectedItem);
  //           //   setAddonCombination(selectedItem?.addons || []);
  //          acc.push(cartItem)
  //           return acc;
  //         }

  //       }
  //       else {
  //           acc.push(item)
  //           acc.push(cartItem)
  //         return acc;
  //       }
  //     }, []);

  //     console.log("returned data", data);
  //     return data;
  //   } else {
  //     return [...cart, cartItem];
  //   }
};

export const convertToAddonsArray = (cart, cartItem) => {
  return [...cart, cartItem];
};


