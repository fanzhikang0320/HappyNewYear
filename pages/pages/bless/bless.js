// pages/bless/bless.js
/**
 * 进入页面播放bgm
 */

let str = '';
let friendStr = '';
Page({
  audioContext: wx.createInnerAudioContext(),
  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    friendText:""
  },
  textTimer: null,
  textTimeout:null,
  friendTimer: null,



  font () {

    clearInterval(this.textTimer);
    // clearInterval(this.friendTimer);
    clearTimeout(this.textTimeout);
    let that = this;
    let textList = ['嗨', '喽', '！', '新', '的', '一', '年', '又', '要', '开', '始', '啦，', '新', '年', '快', '乐', '哟', '！','(^_−)☆'];
    let friendTextList = ['—','—','M','r','.','F','a','n'];

    this.textTimer = setInterval(function () {

      //当祝福话语显示完毕的时候,让名字显示

      if (textList.length == 0) {
        clearInterval(that.friendTimer);
        //执行让名字显示
        that.friendTimer = setInterval(function () {
          clearInterval(that.friendTimer);
          //署名
          if (friendTextList.length == 0) {
            str = '';
            friendStr = '';

            that.textTimeout = setTimeout(function () {
              that.setData({
                text: '',
                friendText: ''
              });
              that.font();
            }, 500)
            
          } else {
            let currentFriendText = friendTextList.shift();
            friendStr += currentFriendText;
            that.setData({
              friendText: friendStr
            });
          }
        },500);

      } else {
        //显示祝福话语
        let currentText = textList.shift(); //每次拆出一个字
        str += currentText;
        that.setData({
          text: str //每次加上上一次裁切的字
        });
      }
    },550);


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
    let that = this;
    // wx.setInnerAudioOption({
    //   mixWithOther:true,
    //   obeyMuteSwitch:false,
    //   success: function (res) {
    //     console.log('success',res);
        that.audioContext.src = "/source/bgm.mp3"
        that.audioContext.loop = true;
        that.audioContext.play();
        that.audioContext.onPlay(function () {
          that.font();
        });
    //   },
    //   fail: function (res) {
    //     console.log('fail',res)
    //   }
    // })
    
    
    
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