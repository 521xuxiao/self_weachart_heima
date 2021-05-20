// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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
        this.getStorge();
    },


    /**
     * 从缓存中拿用户信息
     */
    getStorge() {
        const userInfo = wx.getStorageSync("userInfo") || {};
        if(userInfo.nickName) {
            this.setData({userInfo});
        }
    },


    /**
     * 跳转到登录页面
     */
    toLogin() {
        wx.navigateTo({
            url: '/pages/login/index'
        });
    },

    /**
     * 跳转到订单页面
     */
    toOrder(e) {
        const {type} = e.currentTarget.dataset;
        wx.navigateTo({
            url: '/pages/order/index?type='+type
        });
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