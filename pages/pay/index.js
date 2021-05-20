import { request1 } from "../../request/request";

// pages/pay/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        totlePrice: 0,
        address: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log()
        this.setData({
            totlePrice: options.totlePrice
        })
    },


    /**
     * 支付按钮
     */
    async handlePay() {
        const token = wx.getStorageSync("token");
        if(!token) {   // 没有token，没有登录， 跳转到登录页面进行授权
            wx.navigateTo({
                url: '/pages/auth/index'
            });
            return;
        }
        // 已经有token了， 就可以正常的支付了(支付之前先创建订单)
        // const header = {Authorization: token};
        // const order_price = this.data.totlePrice,
        // const consignee_addr  = this.data.address,
        // const goods = [{goods_id:1, goods_number: 1, goods_price: 1288}];
        // let res = await request1("api/public/v1/my/orders/create", "post", {order_price, consignee_addr, goods}, {header});
        // const {orderId} = res.message;
        // console.log("订单创建成功，订单号："+orderId);
        // // 然后就可以带着订单号进行预支付来换取微信支付requestPayment的参数了
        // const header1 = {Authorization: token};
        // const order_number = orderId;
        // let res1  = request1("api/public/v1/my/orders/req_unifiedorder", "post", {order_number}, {header1});
        // const {timeStamp, nonceStr, package, signType, paySign} = res1.message.pay;  // 微信支付的一些参数
        // wx.requestPayment({
        //     timeStamp,
        //     nonceStr,
        //     package,
        //     signType,
        //     paySign,
        //     success: (result)=>{
        //         console.log("支付成功");
        //     },
        //     fail: (err)=>{
        //         console.log("支付失败");
        //     }
        // });
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})