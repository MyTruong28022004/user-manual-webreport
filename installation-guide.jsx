import React from 'react';

const packageUrl = 'https://systemexecom.sharepoint.com/:f:/r/sites/FusionCloud/Shared%20Documents/01_General/Document/99_JP%20to%20VN/WebReport%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C%E3%81%AE%E5%85%B1%E6%9C%89/webreport20smart-5.10.11.b-20261231?d=w4f2ecb88a36c4253aa532c185fcda89b&csf=1&web=1&e=GqjzF4';
const documents = [
  'https://systemexecom.sharepoint.com/:t:/r/sites/FusionCloud/Shared%20Documents/01_General/Document/99_JP%20to%20VN/VN_Huong%20Dan/HUONG_DAN_CAI_DAT_WEBREPORT_5.10.11.md?d=wdc825bcf3a6c411fb0951dea74255d08&csf=1&web=1&e=rW2uVD',
  'https://systemexecom.sharepoint.com/:t:/r/sites/FusionCloud/Shared%20Documents/01_General/Document/99_JP%20to%20VN/VN_Huong%20Dan/HUONG_DAN_THEM_ORACLE_JDBC_VAO_WEBREPORT.md?d=w214040a011ec42b1848df08a56fb491c&csf=1&web=1&e=06uiGG',
  'https://systemexecom.sharepoint.com/:t:/r/sites/FusionCloud/Shared%20Documents/01_General/Document/99_JP%20to%20VN/VN_Huong%20Dan/HUONG_DAN_TAO_REPORT_WEBREPORT_TU_DB_DEN_WEB.md?d=w55f85f87a20d4e619ce78bc6194055c3&csf=1&web=1&e=bPziJr',
];

const guideByLanguage = {
  vi: {
    title: 'Cài đặt và cấu hình WebReport 5.10.11.b',
    intro: 'Chuẩn bị Windows 64-bit, quyền quản trị, OpenJDK 21.0.1 64-bit và Apache Tomcat 9.0.113. Kiểm tra cổng 8080 còn trống.',
    packageLabel: 'Mở thư mục bộ cài WebReport 5.10.11.b',
    references: 'Tài liệu chi tiết trên SharePoint',
    documents: [
      'Cài đặt WebReport trên Windows và Tomcat',
      'Thêm trình điều khiển Oracle JDBC vào WebReport',
      'Tạo báo cáo từ cơ sở dữ liệu đến trình duyệt',
    ],
    steps: [
      {
        id: 'setup-server', title: '1. Cài máy chủ và triển khai WebReport',
        items: [
          'Giải nén OpenJDK vào `C:\\WebReport\\jdk-21.0.1`.',
          'Cài dịch vụ `Tomcat9` tại `C:\\WebReport\\Tomcat9`. Đặt cổng `8080` và chọn Java VM `bin\\server\\jvm.dll` trong thư mục OpenJDK.',
          'Dừng Tomcat, sao lưu thư mục `conf`, rồi chép nội dung `WRS\\Support\\Windows\\Tomcat 9.0` từ bộ cài vào thư mục Tomcat.',
          'Chép `WRS\\Module\\cvbi.war` vào thư mục `webapps` của Tomcat.',
          'Tắt connector AJP trong `conf\\server.xml` nếu không dùng. Khởi động `Tomcat9` và chờ triển khai xong.',
        ],
      },
      {
        id: 'setup-db', title: '2. Khởi tạo cơ sở dữ liệu quản trị H2',
        items: [
          'Trên máy chủ, mở `http://localhost:8080/cvbi/CVDB/createdb_h2.jsp`.',
          'Nhập JNDI `jdbc/CVDB`, User ID `dbadmin`, DBMS `h2` và Verbose `true`.',
          'Chạy khởi tạo và chờ thông báo `正常に終了しました`.',
          'Kiểm tra tệp `C:\\cvconfig\\cvdb\\h2\\cvdb.mv.db`, rồi khởi động lại `Tomcat9`.',
        ],
      },
      {
        id: 'setup-admin', title: '3. Cài Admin Management và đăng ký giấy phép',
        items: [
          'Chạy `WRS\\admin\\WebReportSmartAdministrator32.exe` bằng quyền quản trị.',
          'Mở `CvBiMgr3u.exe` và nhập máy chủ `localhost:8080/cvbi` (không có `http://`).',
          'Đăng nhập bằng tài khoản quản trị. Tài khoản và mật khẩu ban đầu của môi trường thử nghiệm là `cvadmin`. Đổi mật khẩu trước khi cho máy khác truy cập.',
          'Vào `管理 → ライセンス → インポート`, chọn `licence.cvlic` trong thư mục cha của `WebReport51011bTrial` và kiểm tra ngày hết hạn.',
        ],
      },
      {
        id: 'setup-designer', title: '4. Cài Designer và lưu báo cáo',
        items: [
          'Chạy `WRS\\designer\\WebReportSmartDesigner32.exe` bằng quyền quản trị.',
          'Mở `CvBiDesigner.exe` và kết nối `localhost:8080/cvbi`. Nếu chạy từ máy khác, dùng tên máy chủ Tomcat thay cho `localhost`.',
          'Đăng nhập bằng tài khoản có quyền thiết kế báo cáo.',
          'Đăng ký nguồn dữ liệu và bảng cần dùng trong Admin.',
          'Trong Designer, tạo hoặc mở định nghĩa báo cáo, chạy thử và lưu vào thư mục menu mà người dùng có quyền xem.',
        ],
      },
      {
        id: 'setup-web', title: '5. Đăng nhập và chạy báo cáo trên trình duyệt',
        items: [
          'Mở `http://localhost:8080/cvbi/login` trên máy chủ. Từ máy khác, dùng địa chỉ được cấp cho máy chủ Tomcat.',
          'Đăng nhập bằng tài khoản có quyền xem báo cáo.',
          'Mở báo cáo trong cây menu. Nếu không thấy báo cáo, kiểm tra vị trí lưu và quyền xem menu.',
          'Nhập điều kiện tìm kiếm, chạy báo cáo và kiểm tra kết quả.',
        ],
      },
    ],
  },
  ja: {
    title: 'WebReport 5.10.11.b のインストールと設定',
    intro: '64 ビット版 Windows、管理者権限、64 ビット版 OpenJDK 21.0.1、Apache Tomcat 9.0.113 を用意し、8080 番ポートが空いていることを確認します。',
    packageLabel: 'WebReport 5.10.11.b の配布フォルダーを開く',
    references: 'SharePoint の詳細手順（ベトナム語）',
    documents: [
      'Windows と Tomcat への WebReport の導入',
      'WebReport への Oracle JDBC ドライバーの追加',
      'データベース接続からブラウザーでの帳票表示まで',
    ],
    steps: [
      {
        id: 'setup-server', title: '1. サーバーの準備と WebReport の配置',
        items: [
          'OpenJDK を `C:\\WebReport\\jdk-21.0.1` に展開します。',
          '`Tomcat9` を Windows サービスとして `C:\\WebReport\\Tomcat9` にインストールします。ポートは `8080`、Java VM は OpenJDK フォルダーの `bin\\server\\jvm.dll` を指定します。',
          'Tomcat を停止し、`conf` をバックアップします。配布パッケージの `WRS\\Support\\Windows\\Tomcat 9.0` の内容を Tomcat のフォルダーへコピーします。',
          '`WRS\\Module\\cvbi.war` を Tomcat の `webapps` へコピーします。',
          'AJP が不要であれば `conf\\server.xml` で無効にします。`Tomcat9` を起動して展開を待ちます。',
        ],
      },
      {
        id: 'setup-db', title: '2. H2 管理データベースの初期化',
        items: [
          'サーバーで `http://localhost:8080/cvbi/CVDB/createdb_h2.jsp` を開きます。',
          'JNDI に `jdbc/CVDB`、ユーザー ID に `dbadmin`、DBMS に `h2`、詳細出力に `true` を指定します。',
          '初期化を実行し、`正常に終了しました` と表示されるまで待ちます。',
          '`C:\\cvconfig\\cvdb\\h2\\cvdb.mv.db` を確認し、`Tomcat9` を再起動します。',
        ],
      },
      {
        id: 'setup-admin', title: '3. 管理ツールの導入とライセンス登録',
        items: [
          '`WRS\\admin\\WebReportSmartAdministrator32.exe` を管理者として実行します。',
          '`CvBiMgr3u.exe` を開き、サーバー欄に `localhost:8080/cvbi`（`http://` なし）を入力します。',
          '管理者アカウントでログインします。検証環境の初期ユーザー名とパスワードはどちらも `cvadmin` です。他の端末からのアクセスを許可する前に変更します。',
          '`管理 → ライセンス → インポート` から `WebReport51011bTrial` の親フォルダーにある `licence.cvlic` を選び、有効期限を確認します。',
        ],
      },
      {
        id: 'setup-designer', title: '4. 定義設計ツールの導入と帳票の保存',
        items: [
          '`WRS\\designer\\WebReportSmartDesigner32.exe` を管理者として実行します。',
          '`CvBiDesigner.exe` を開いて `localhost:8080/cvbi` に接続します。別の端末では Tomcat のホスト名を指定します。',
          '定義設計権限のあるアカウントでログインします。',
          '管理ツールで使用するデータソースとテーブルを登録します。',
          '定義設計ツールで帳票定義を作成または編集して試行し、閲覧権限のあるメニューフォルダーに保存します。',
        ],
      },
      {
        id: 'setup-web', title: '5. ブラウザーでログインして帳票を実行',
        items: [
          'サーバーで `http://localhost:8080/cvbi/login` を開きます。別の端末では Tomcat サーバーに割り当てられたアドレスを使います。',
          '帳票の閲覧権限があるアカウントでログインします。',
          'メニューツリーから帳票を開きます。表示されない場合は、保存先とメニューの閲覧権限を確認します。',
          '検索条件を入力して帳票を実行し、結果を確認します。',
        ],
      },
    ],
  },
};

function inline(text) {
  return text.split('`').map((segment, index) => index % 2 ? <code key={index}>{segment}</code> : segment);
}

export function InstallationGuide({language}) {
  const guide = guideByLanguage[language];

  return (
    <section className="installation-guide" id="setup">
      <h2>{guide.title}</h2>
      <p>{guide.intro}</p>
      <p><a href={packageUrl}>{guide.packageLabel}</a></p>
      <h3 id="setup-resources">{guide.references}</h3>
      <ul>
        {guide.documents.map((label, index) => (
          <li key={documents[index]}><a href={documents[index]}>{label}</a></li>
        ))}
      </ul>
      {guide.steps.map(({id, title, items}, groupIndex) => (
        <React.Fragment key={id}>
          <h3 id={id}>{title}</h3>
          <ol className="steps">
            {items.map((item, itemIndex) => (
              <li key={item} data-step={`${groupIndex + 1}.${itemIndex + 1}`}>
                <p>{inline(item)}</p>
              </li>
            ))}
          </ol>
        </React.Fragment>
      ))}
    </section>
  );
}
