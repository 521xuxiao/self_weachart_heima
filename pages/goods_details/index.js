import { request1 } from "../../request/request";
import regeneratorRuntime from "../../libs/runtime/runtime.js";
// pages/goods_details/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: {},
        isCollect: true
    },
    dataObj: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.id)
        this.initData(options.id);
    },

    async initData(goods_id) {
        let res = await request1("api/public/v1/goods/detail?goods_id="+goods_id);
        // console.log(res.message)
        this.dataObj = res.message
        this.setData({
            dataList: res.message
        })
    },


    /**
     * 图片预览功能
     */
    imgPreview(e) {
        const urls = this.data.dataList.pics.map(item=>item.pics_big);
        const current = e.currentTarget.dataset.item.pics_big;
        wx.previewImage({
            current,
            urls
        });
    },



    /***
     * 添加购物车的按钮
     */
    cartAdd() {
        console.log("购物车")
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex(item=>item.goods_id === this.dataObj.goods_id);
        if(index !== -1) {
            //不是第一次，数量加一
            cart[index].number++;
        }else{
            //第一次加进来
            this.dataObj.number = 1;
            this.dataObj.isChecked = true;
            cart.push(this.dataObj);
        }
        wx.setStorageSync("cart", cart);
        wx.showToast({
            title: '购物车加入成功',
            icon: 'success',
            mask: true
        });
    },

    /**
     * 收藏
     */
    handleCollect() {
        const {isCollect} = this.data;
        this.setData({
            isCollect: !isCollect
        });
        if(!isCollect) {
            wx.showToast({
                title: '取消成功',
                icon: 'error'
            });
        }else{
            wx.showToast({
                title: '收藏成功',
                icon: 'success'
            });
        }
    },

    /**
     * 跳转到购物车页面
     */
    goCart() {
        wx.switchTab({
            url: '/pages/cart/index'
        })
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