var numeral=require('numeral');
module.exports= function Cart(oldCart)
{
    this.items=oldCart.items || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;
    this.add= function(item,id){
        var storedItem=this.items[id];
        if(!storedItem){
            storedItem=this.items[id]={item:item,qty:0,price:0};
        }
        storedItem.qty++;
        storedItem.price=storedItem.item.price* storedItem.qty;
        storedItem.item.stringprice=numeral(storedItem.item.price).format('0,0');
        storedItem.stringprice=numeral(storedItem.price).format('0,0');
        this.totalQty++;
        this.totalPrice+=storedItem.item.price;
        
    }
    this.generateArray=function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
}