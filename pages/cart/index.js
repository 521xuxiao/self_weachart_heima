import objects from "../../chooseAddress/chooseAddress.js";
import { request1 } from "../../request/request";
import regeneratorRuntime from "../../libs/runtime/runtime.js";
Page({
    data: {
        address: {},
        cartList: [],
        allChecked: true,
        totlePrice: 0,
        totleNumber: 0
    },

    /**
     * 
     * 获取小程序的收货地址
     */
    async getAddress() {
        try{
            let result = await objects.getSetting();
            if(!(result.authSetting["scope.address"] === true || result.authSetting["scope.address"] === undefined)) {
                let result2 = await objects.openSetting();
            }
            let result1 = await objects.chooseAddress();
            this.setData({
                address: result1
            })
            wx.setStorageSync("address", result1);
        }catch(e) {
            console.log(e);
        }
    },


    //options(Object)
    onLoad: function(options){
        
    },
    onReady: function(){
        
    },
    onShow: function(){
        let address = wx.getStorageSync("address");
        let cartList = wx.getStorageSync("cart") || [];
        // 计算总价， 数量， 是否全选
        this.computed(cartList);
        if(address) {
            this.setData({
                address
            })
        }
    },

    /**
     * 计算总价， 数量， 是否全选
     */
    computed(cartList) {
        let allChecked = true, totlePrice = 0, totleNumber=0;
        if(cartList && cartList.length) {
            cartList.forEach((item)=>{
                if(!item.isChecked) {
                    allChecked = false;
                }else{
                    totlePrice += (item.goods_price * item.number);
                    totleNumber += item.number;
                }
            })
        }else{
            allChecked = false;
            totlePrice = 0;
            totleNumber = 0;
        }
        this.setData({
            cartList,
            allChecked,
            totlePrice,totleNumber
        })
        wx.setStorageSync("cart", cartList);
    },

    /**
     * 数组里面的复选框的变化按钮
     */
    checkItem(e) {
        if(e.detail.value.length === 0) {
            // 取消复选框， 将isChecked制成false
            let index = this.data.cartList.findIndex(item=>item.goods_id.toString() === e.currentTarget.dataset.id.toString());
            this.data.cartList[index].isChecked = false;
        }else{
            let index = this.data.cartList.findIndex(item=>item.goods_id.toString() === e.currentTarget.dataset.id.toString());
            this.data.cartList[index].isChecked = true;
        }
        this.setData({
            cartList: [...this.data.cartList]
        })
        this.computed(this.data.cartList);
    },

    /**
     * 全选 复选框
     */
    allHandleChange(e) {
        let {cartList} = this.data;
        if(e.detail.value.length === 0) {
            cartList.forEach((item)=>{
                item.isChecked = false;
            })
        }else{
            cartList.forEach((item)=>{
                item.isChecked = true;
            })
        }
        this.computed(cartList);
    },

    /**
     * 减法
     */
    subtraction(e) {
        this.addCommon(e, "-");
    },

    /**
     * 加法
     */
    addition(e) {
        this.addCommon(e, "+");
    },

    /**
     * 加减法的公共方法
     */
    async addCommon(e, flag) {
        let index = this.data.cartList.findIndex(v=>v.goods_id===e.currentTarget.dataset.number);
        if(flag === "+") {
            this.data.cartList[index].number++
        }else{
            if(this.data.cartList[index].number>1) {
                this.data.cartList[index].number--
            }else{
                //减到0就删除
                const result = await objects.showModal("删除", "您确定要删除吗？");
                
                this.data.cartList[index].number > 1 ? this.data.cartList[index].number-- : null;
                result === "ok" ? this.data.cartList.splice(index, 1) : null;
            }
        }
        this.setData({
            cartList: this.data.cartList
        })
        this.computed(this.data.cartList);
    },

    /**
     * 结算按钮
     */
    account() {
        const {address, cartList, totlePrice} = this.data;
        // console.log(address, cartList)
        if(address.cityName === undefined || cartList.length === 0){
            wx.showToast({
                title: '您没有获取地址或者购物车没有商品',
                icon: 'none'
            });
            return;
        }
        wx.navigateTo({
            url: '/pages/pay/index?totlePrice='+totlePrice
        });
    },


    onHide: function(){

    },
    onUnload: function(){

    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item){

    }
});