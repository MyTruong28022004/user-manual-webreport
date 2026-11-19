import packageFolder from './assets/setup-live/01-bo-cai.png?inline';
import tomcatConf from './assets/setup-live/03-tomcat-conf.png?inline';
import httpConnector from './assets/setup-live/04-server-xml.png?inline';
import h2Resource from './assets/setup-live/06-context-xml.png?inline';
import adminInstaller from './assets/setup-live/08-cai-admin.png?inline';
import designerInstaller from './assets/setup-live/09-cai-designer.png?inline';
import installedClients from './assets/setup-live/10-cong-cu-da-cai.png?inline';
import webLogin from './assets/setup-live/11-webreport-login.png?inline';

export const setupEvidence = {
  'setup-resources': {
    4: {
      src: packageFolder, width: 765, height: 127,
      vi: 'Thư mục bộ cài đã giải nén và tệp licence.cvlic nằm cùng cấp.',
      ja: '展開した配布パッケージのフォルダーと同じ階層にある licence.cvlic。',
    },
  },
  'setup-server': {
    4: {
      src: tomcatConf, width: 867, height: 408,
      vi: 'Các tệp context.xml và server.xml trong thư mục conf của Tomcat.',
      ja: 'Tomcat の conf フォルダーにある context.xml と server.xml。',
    },
    5: {
      src: httpConnector, width: 1693, height: 19,
      vi: 'Dòng cấu hình Connector HTTP trên cổng 8080 trong server.xml.',
      ja: 'server.xml のポート 8080 の HTTP コネクター設定。',
    },
  },
  'setup-db': {
    2: {
      src: h2Resource, width: 1709, height: 38,
      vi: 'Cấu hình jdbc/CVDB trong context.xml. Mật khẩu đã được che.',
      ja: 'context.xml の jdbc/CVDB 設定。パスワードは非表示です。',
    },
  },
  'setup-admin': {
    1: {
      src: adminInstaller, width: 788, height: 73,
      vi: 'Tệp cài đặt WebReportSmartAdministrator32.exe.',
      ja: '管理ツールのインストーラー WebReportSmartAdministrator32.exe。',
    },
  },
  'setup-designer': {
    1: {
      src: designerInstaller, width: 867, height: 78,
      vi: 'Tệp cài đặt WebReportSmartDesigner32.exe.',
      ja: '定義設計ツールのインストーラー WebReportSmartDesigner32.exe。',
    },
    2: {
      src: installedClients, width: 801, height: 340,
      vi: 'Tệp chạy CvBiDesigner.exe và CvBiMgr3u.exe trong thư mục đã cài.',
      ja: 'インストール先にある CvBiDesigner.exe と CvBiMgr3u.exe。',
    },
  },
  'setup-web': {
    1: {
      src: webLogin, width: 1750, height: 1213,
      vi: 'Trang đăng nhập WebReport đang chạy trên máy chủ localhost:8080.',
      ja: 'localhost:8080 で稼働している WebReport のログイン画面。',
    },
  },
};
