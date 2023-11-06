
//Method to take care of the duplicates
export function resolveDuplicate(cartItems) {

    let uniqueList = [];
    let key = "Id";
    let uniqueObj = {};

    //Loop over the so-cart and count the number of times an Id is repeated
    cartItems.forEach(obj => {
        // If the Ids match, count the number of occurence
        if (uniqueList.some(value => { return value[key] == obj[key]})) {
            uniqueList.forEach((obj1) => {
                if (obj1[key] === obj[key]) {
                    uniqueObj = obj1;
                    obj1.Count++;
                }
            })
        } else if (!uniqueList.some(value => { return value[key] == obj[key]}) && obj.Count > 1) {
                //If the Id is repeated only once and the Count is more than one, don't reset the 
                //so-cart to Count 1
                uniqueObj = obj;
                uniqueObj.Count + 1;
                uniqueList.push(uniqueObj);
                
        } else {
            //If the Id is only repeated once, then set the count to 1 and add to the new list
                uniqueObj = obj;
                uniqueObj.Count = 1;
                uniqueList.push(uniqueObj);
        }
    })
    return uniqueList;
}

