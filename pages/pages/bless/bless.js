// pages/bless/bless.js
/**
 * 进入页面播放bgm
 */

let str = ''; //祝福话语
let friendStr = ''; //名字
Page({
  audioContext: wx.createInnerAudioContext(), //全局音频对象
  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    friendText:""
  },

  textTimer: null, //这个用于祝福语句，定时器
  
  /**
   * 控制字体挨个显示
   */
  font () {
    str = '';
    friendStr = '';
    this.setData({
      text:'',
      friendText: ''
    });
    let that = this;
    clearInterval(this.textTimer); //进来先清理上一次定时器
    clearInterval(this.friendTimer);
    let textList = ['嗨', '喽', '！', '新', '的', '一', '年', '又', '要', '开', '始', '啦','，', '这','虽','是','一','条','普','通','的','祝','福','，','但','是','我','希','望','它','是','最','特','别','的','呈','现','。','新', '年', '快', '乐', '哟', '！','(^_−)☆'];
    
    this.textTimer = setInterval(function () {
      //当祝福话语显示完毕的时候,让名字显示
      if (textList.length == 0) {
        //执行让名字显示,并清除定时器
        that.friendFont();
      } else {
        //显示祝福话语
        let currentText = textList.shift(); //每次拆出一个字
        str += currentText;
        that.setData({
          text: str //每次加上上一次裁切的字
        });
      }
    },600);

  },
  textTimeout: null, //延迟执行回调，延迟器
  friendTimer: null, //用于显示落名，定时器

  friendFont () {
    let that = this;
    clearInterval(this.textTimer);
    clearInterval(that.friendTimer);
    let friendTextList = ['—', '—', 'M', 'r', '.', 'F', 'a', 'n'];

    that.friendTimer = setInterval(function () {

      if (friendTextList.length == 0) {
        
       clearInterval(that.friendTimer);
      } else {
        let currentFriendText = friendTextList.shift();
        friendStr += currentFriendText;
        that.setData({
          friendText: friendStr
        });
      }
    }, 600);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    this.audioContext.src = "https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBbkt6VlFKTXU3UzJpVlBrR2hoeFVMcjE3NlMw.mp3";
    this.audioContext.loop = true; //循环播放
    // 如果用户开启静音模式，让用户仍旧可以听到音乐
    wx.setInnerAudioOption({
      mixWithOther:true,
      obeyMuteSwitch:false,
      success: function (res) {
        //检测音乐可以流畅播放的时候，开始播放音乐
        that.audioContext.onCanplay(function () {
          that.audioContext.play();
        });
        //监听播放音乐时触发，字体显示
        that.audioContext.onPlay(function () {
          // clearInterval(that.textTimer);
          that.font();
        });
      },
      fail: function (res) {
        console.log('fail',res)
      }
    })
    
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.textTimer);
    clearTimeout(this.textTimeout);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '新春祝福请查收！',
      imageUrl: 'http://chuantu.xyz/t6/713/1579333830x992245926.png',
      path: '/pages/index/index'
    }
  }
})