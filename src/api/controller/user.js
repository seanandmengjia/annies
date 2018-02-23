const Base = require('./base.js');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Base {
  async infoAction(openId) {
    var openId = this.get('openId');
    const userInfo = await this.model('user').where({weixin_openid: openId}).find();
    delete userInfo.password;
    return this.success({regInfo: userInfo}); 
  }

  /**
   * 保存用户头像
   * @returns {Promise.<void>}
   */
  async saveAvatarAction() {
    const avatar = this.file('avatar');
    if (think.isEmpty(avatar)) {
      return this.fail('保存失败');
    }

    const avatarPath = think.RESOURCE_PATH + '/static/user/avatar/1.' + _.last(_.split(avatar.path, '.'));

    fs.rename(avatar.path, avatarPath, function(res) {
      return this.success();
    });
  }
};
