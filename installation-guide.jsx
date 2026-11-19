import React from 'react';

const downloads = {
  java: 'https://aka.ms/download-jdk/microsoft-jdk-21.0.1-windows-x64.zip',
  tomcat: 'https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.113/bin/apache-tomcat-9.0.113.exe',
  webreport: 'https://www.jbcc.co.jp/download/solution/jbsol/webreport_trial/dlform.html',
  oracle: 'https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html',
};

const h2Sample = String.raw`<Resource name="jdbc/CVDB" auth="Container"
    type="javax.sql.DataSource" driverClassName="org.h2.Driver"
    scope="Unshareable"
    url="jdbc:h2:C:\cvconfig\cvdb\h2\cvdb;MODE=Derby;DB_CLOSE_DELAY=60"
    username="dbadmin" password="REPLACE_WITH_H2_PASSWORD"
    maxTotal="40" maxIdle="20" maxWaitMillis="10000" validationQuery="SELECT 1"/>`;

const oracleSample = `<Resource name="jdbc/OracleReports" auth="Container"
    type="javax.sql.DataSource" driverClassName="oracle.jdbc.OracleDriver"
    url="jdbc:oracle:thin:@//ORACLE_HOST:1521/ORACLE_SERVICE"
    username="ORACLE_USER" password="REPLACE_WITH_ORACLE_PASSWORD"/>`;

const templates = {
  h2: {name: 'context-h2.xml.example', text: h2Sample},
  oracle: {name: 'context-oracle.xml.example', text: oracleSample},
};

const guideByLanguage = {
  vi: {
    title: 'Cài đặt và cấu hình WebReport 5.10.11.b',
    intro: 'Hướng dẫn cho Windows 64-bit. Chuẩn bị tài khoản quản trị Windows và cổng 8080 còn trống. Các đường dẫn bên dưới dùng thư mục C:\\WebReport làm ví dụ.',
    save: 'Tải mẫu',
    steps: [
      {
        id: 'setup-resources', title: '0. Tải và kiểm tra các tệp cài đặt',
        items: [
          'Bấm [[java]]. Lưu tệp `microsoft-jdk-21.0.1-windows-x64.zip` vào thư mục Tải xuống. Đây là bản OpenJDK 21.0.1 cho Windows 64-bit của Microsoft.',
          'Bấm [[tomcat]]. Lưu tệp `apache-tomcat-9.0.113.exe` vào thư mục Tải xuống.',
          'Mở [[webreport]], bấm `ダウンロードはこちら` (Tải xuống), đọc điều kiện dùng thử, điền biểu mẫu và nhập địa chỉ email nhận liên kết. Gửi biểu mẫu.',
          'Mở email do JBCC gửi, bấm liên kết trong email và lưu tệp ZIP. Bấm chuột phải vào tệp ZIP, chọn `Extract All…` (Giải nén tất cả), chọn một thư mục rồi bấm `Extract`. Xác nhận bên trong có thư mục `WebReport51011bTrial` và tệp `licence.cvlic` nằm cùng cấp với thư mục đó. Nếu gói tải về mang phiên bản khác, đối chiếu hướng dẫn Windows và Tomcat đi kèm gói đó.',
        ],
        labels: {java: 'Tải OpenJDK 21.0.1', tomcat: 'Tải Apache Tomcat 9.0.113', webreport: 'trang tải bản dùng thử WebReport của JBCC'},
      },
      {
        id: 'setup-server', title: '1. Cài Java, cấu hình Tomcat và triển khai WebReport',
        items: [
          'Bấm chuột phải vào tệp ZIP Java và chọn `Extract All…`. Chép thư mục đã giải nén có chứa `bin` vào `C:\\WebReport\\jdk-21.0.1`. Kiểm tra bằng lệnh PowerShell `& "C:\\WebReport\\jdk-21.0.1\\bin\\java.exe" -version`.',
          'Chạy `apache-tomcat-9.0.113.exe` bằng quyền quản trị. Chọn dịch vụ Windows tên `Tomcat9`, cổng HTTP `8080` và thư mục cài `C:\\WebReport\\Tomcat9`. Khi được hỏi thư mục Java, chọn `C:\\WebReport\\jdk-21.0.1`.',
          'Mở `services.msc`, tìm Apache Tomcat, dừng dịch vụ `Tomcat9` và sao lưu thư mục `C:\\WebReport\\Tomcat9\\conf`. Nếu cần xác nhận Java, chạy `C:\\WebReport\\Tomcat9\\bin\\tomcat9w.exe`, vào thẻ `Java` và đặt `Java Virtual Machine` thành `C:\\WebReport\\jdk-21.0.1\\bin\\server\\jvm.dll`.',
          'Trong bộ cài, mở `WebReport51011bTrial\\WRS\\Support\\Windows\\Tomcat 9.0\\conf`. Với máy cài mới, chép `server.xml` và `context.xml` vào `C:\\WebReport\\Tomcat9\\conf`. Nếu Tomcat đã phục vụ ứng dụng khác, mở từng tệp và bổ sung các cấu hình bên dưới vào bản hiện tại.',
          'Mở `C:\\WebReport\\Tomcat9\\conf\\server.xml` bằng trình soạn thảo chạy với quyền quản trị. Kiểm tra Connector có `protocol="HTTP/1.1"` và `port="8080"`. Nếu không dùng AJP, tìm Connector có `protocol="AJP/1.3"` và vô hiệu hóa cả phần tử bằng chú thích XML `<!-- … -->`. Lưu tệp.',
          'Chép `WebReport51011bTrial\\WRS\\Module\\cvbi.war` vào `C:\\WebReport\\Tomcat9\\webapps\\cvbi.war`. Thực hiện cấu hình H2 ở bước 2 trước khi bật lại Tomcat.',
        ],
      },
      {
        id: 'setup-db', title: '2. Cấu hình và khởi tạo cơ sở dữ liệu quản trị H2',
        items: [
          'Tạo thư mục `C:\\cvconfig\\cvdb\\h2`. Trong `services.msc`, mở thuộc tính `Tomcat9`, xem thẻ `Log On` để biết tài khoản chạy dịch vụ. Trong thuộc tính thư mục H2, vào `Security → Edit` và cấp quyền `Modify` cho đúng tài khoản đó.',
          'Mở `C:\\WebReport\\Tomcat9\\conf\\context.xml`, tìm `<Resource name="jdbc/CVDB"` nằm bên trong `<Context>`. Đối chiếu với mẫu H2 bên dưới. Nếu chưa có, thêm một Resource vào trước `</Context>`. Chỉ giữ một mục `jdbc/CVDB` và thay `REPLACE_WITH_H2_PASSWORD` bằng mật khẩu H2 thực tế nếu dùng mẫu.',
          'Trong `services.msc`, bấm `Start` cho `Tomcat9`. Khi WAR triển khai xong, mở `http://localhost:8080/cvbi/CVDB/createdb_h2.jsp` ngay trên máy chủ. Nhập JNDI `jdbc/CVDB`, User ID `dbadmin`, DBMS `h2` và Verbose `true`. Nếu biểu mẫu yêu cầu mật khẩu, dùng cùng mật khẩu đã đặt trong `context.xml`.',
          'Chạy khởi tạo. Khi thấy `正常に終了しました`, xác nhận tệp `C:\\cvconfig\\cvdb\\h2\\cvdb.mv.db` đã tạo và bấm `Restart` cho `Tomcat9`. Thử mở `http://localhost:8080/cvbi/login`.',
        ],
        template: 'h2',
      },
      {
        id: 'setup-admin', title: '3. Cài Admin Management và đăng ký giấy phép',
        items: [
          'Mở `WebReport51011bTrial\\WRS\\admin`, bấm chuột phải vào `WebReportSmartAdministrator32.exe` và chọn `Run as administrator`.',
          'Sau khi cài, mở `C:\\CustomerVision\\WebReport\\CvBiMgr3u.exe` hoặc mở tệp cùng tên từ thư mục cài đã chọn. Nhập `localhost:8080/cvbi` vào ô máy chủ, bỏ tiền tố `http://`.',
          'Đăng nhập bằng tài khoản quản trị. Với bản thử nghiệm mới, tên đăng nhập và mật khẩu khởi tạo đều là `cvadmin`. Đổi mật khẩu trước khi cho phép thiết bị khác truy cập.',
          'Mở `管理 → ライセンス → インポート`, chọn tệp `licence.cvlic` nằm cùng cấp với thư mục `WebReport51011bTrial` và kiểm tra ngày hết hạn hiển thị. Nếu cần xử lý tài khoản dịch vụ để đăng ký, xem tệp `WRS\\Doc\\ja_JP\\ライセンスの登録と解除手順.pdf` trong bộ cài.',
        ],
      },
      {
        id: 'setup-designer', title: '4. Cài Designer và lưu báo cáo',
        items: [
          'Mở `WebReport51011bTrial\\WRS\\designer`. Bấm chuột phải vào `WebReportSmartDesigner32.exe` và chọn `Run as administrator`.',
          'Mở `CvBiDesigner.exe` trong thư mục cài. Nhập `localhost:8080/cvbi` khi chạy trên máy chủ, hoặc thay `localhost` bằng tên máy chủ Tomcat khi chạy từ máy khác. Đăng nhập bằng tài khoản có quyền thiết kế.',
          'Trong Admin, đăng ký nguồn dữ liệu và bảng. Nếu dùng Oracle, cấu hình theo bước 6 trước. Trong Designer, chọn bảng, thêm cột cần hiển thị, chạy thử rồi lưu báo cáo vào thư mục menu mà người xem có quyền mở.',
        ],
      },
      {
        id: 'setup-web', title: '5. Đăng nhập và chạy báo cáo trên trình duyệt',
        items: [
          'Trên máy chủ, mở `http://localhost:8080/cvbi/login`. Từ máy khác, dùng địa chỉ truy cập được cấp cho máy chủ Tomcat.',
          'Đăng nhập bằng tài khoản người xem. Mở báo cáo trong cây menu, nhập điều kiện tìm kiếm và kiểm tra kết quả. Nếu không thấy báo cáo, kiểm tra thư mục lưu và quyền truy cập menu.',
          'Nếu không mở được trang đăng nhập, kiểm tra trạng thái `Tomcat9` trong `services.msc`, tệp `webapps\\cvbi.war` và nhật ký mới nhất trong `C:\\WebReport\\Tomcat9\\logs`.',
        ],
      },
      {
        id: 'setup-oracle', title: '6. Cấu hình Oracle JDBC nếu báo cáo dùng Oracle',
        items: [
          'Mở [[oracle]]. Chọn bản trình điều khiển phù hợp với phiên bản Oracle Database và Java 21 đang dùng. Trong bảng tải xuống, bấm `ojdbc11.jar` nếu bản đó hỗ trợ Java 21, rồi lưu tệp JAR.',
          'Dừng `Tomcat9`. Chép tệp JAR vào `C:\\WebReport\\Tomcat9\\lib`. Mở `conf\\context.xml` và thêm một Resource có tên riêng, ví dụ `jdbc/OracleReports`, trước `</Context>`. Giữ nguyên Resource `jdbc/CVDB` của H2.',
          'Dùng mẫu Oracle cho kết nối TCP theo service name. Thay `ORACLE_HOST`, `ORACLE_SERVICE`, `ORACLE_USER` và mật khẩu bằng thông tin do quản trị viên cơ sở dữ liệu cấp. Nếu máy chủ dùng TCPS hoặc wallet, dùng chuỗi kết nối và cấu hình wallet do quản trị viên cung cấp.',
          'Khởi động lại Tomcat. Trong Admin, tạo nguồn dữ liệu trỏ đến `jdbc/OracleReports`, thử kết nối, sau đó đăng ký bảng hoặc view cần dùng.',
        ],
        labels: {oracle: 'trang tải trình điều khiển JDBC của Oracle'},
        template: 'oracle',
      },
    ],
  },
  ja: {
    title: 'WebReport 5.10.11.b のインストールと設定',
    intro: '64 ビット版 Windows 向けの手順です。管理者アカウントを用意し、8080 番ポートが空いていることを確認します。以下では C:\\WebReport を使用します。',
    save: '設定例をダウンロード',
    steps: [
      {
        id: 'setup-resources', title: '0. インストールファイルの取得と確認',
        items: [
          '[[java]] をクリックし、`microsoft-jdk-21.0.1-windows-x64.zip` を「ダウンロード」フォルダーに保存します。Microsoft の Windows 64 ビット版 OpenJDK です。',
          '[[tomcat]] をクリックし、`apache-tomcat-9.0.113.exe` を「ダウンロード」フォルダーに保存します。',
          '[[webreport]]を開き、`ダウンロードはこちら` をクリックします。試用条件を確認し、申込フォームに必要事項と受信用のメールアドレスを入力して送信します。',
          'JBCC から届いたメールのリンクを開き、ZIP ファイルを保存します。ファイルを右クリックし、「すべて展開」で展開先を指定します。`WebReport51011bTrial` と、同じ階層にある `licence.cvlic` を確認します。異なるバージョンの場合は、付属の Windows・Tomcat 向け手引きを確認してください。',
        ],
        labels: {java: 'OpenJDK 21.0.1 をダウンロード', tomcat: 'Apache Tomcat 9.0.113 をダウンロード', webreport: 'JBCC の WebReport 評価版ダウンロードページ'},
      },
      {
        id: 'setup-server', title: '1. Java の導入、Tomcat の設定、WebReport の配置',
        items: [
          'Java の ZIP ファイルを右クリックして「すべて展開」を選びます。`bin` を含むフォルダーを `C:\\WebReport\\jdk-21.0.1` に配置します。PowerShell で `& "C:\\WebReport\\jdk-21.0.1\\bin\\java.exe" -version` を実行して確認します。',
          '`apache-tomcat-9.0.113.exe` を管理者として実行します。サービス名に `Tomcat9`、HTTP ポートに `8080`、インストール先に `C:\\WebReport\\Tomcat9`、Java のフォルダーに `C:\\WebReport\\jdk-21.0.1` を指定します。',
          '`services.msc` で `Tomcat9` を停止し、`C:\\WebReport\\Tomcat9\\conf` をバックアップします。Java を確認する場合は `C:\\WebReport\\Tomcat9\\bin\\tomcat9w.exe` の「Java」タブを開き、`Java Virtual Machine` に `C:\\WebReport\\jdk-21.0.1\\bin\\server\\jvm.dll` を指定します。',
          '新規インストールの場合、`WebReport51011bTrial\\WRS\\Support\\Windows\\Tomcat 9.0\\conf` の `server.xml` と `context.xml` を `C:\\WebReport\\Tomcat9\\conf` にコピーします。既存の Tomcat に追加する場合は、現在のファイルに以下の設定を反映します。',
          '管理者権限のエディターで `C:\\WebReport\\Tomcat9\\conf\\server.xml` を開き、`protocol="HTTP/1.1"` のコネクターが `port="8080"` であることを確認します。AJP が不要な場合は `protocol="AJP/1.3"` の要素全体を XML コメント `<!-- … -->` で囲み、保存します。',
          '`WebReport51011bTrial\\WRS\\Module\\cvbi.war` を `C:\\WebReport\\Tomcat9\\webapps\\cvbi.war` にコピーします。手順 2 で H2 を設定してから Tomcat を起動します。',
        ],
      },
      {
        id: 'setup-db', title: '2. H2 管理データベースの設定と初期化',
        items: [
          '`C:\\cvconfig\\cvdb\\h2` を作成します。`services.msc` で `Tomcat9` のプロパティの「ログオン」タブから実行アカウントを確認し、H2 フォルダーの「セキュリティ → 編集」でそのアカウントに「変更」を許可します。',
          '`C:\\WebReport\\Tomcat9\\conf\\context.xml` を開きます。`<Context>` 内の `<Resource name="jdbc/CVDB"` を以下の設定例と照合します。なければ `</Context>` の直前に追加します。`jdbc/CVDB` は 1 件だけにし、設定例の `REPLACE_WITH_H2_PASSWORD` は実際のパスワードに変更します。',
          '`services.msc` で `Tomcat9` を起動します。展開後、サーバー上のブラウザーで `http://localhost:8080/cvbi/CVDB/createdb_h2.jsp` を開きます。JNDI は `jdbc/CVDB`、ユーザー ID は `dbadmin`、DBMS は `h2`、詳細出力は `true` とします。パスワード欄がある場合は `context.xml` と同じ値を入力します。',
          '初期化を実行します。`正常に終了しました` と表示されたら、`C:\\cvconfig\\cvdb\\h2\\cvdb.mv.db` が作成されたことを確認します。`Tomcat9` を再起動し、`http://localhost:8080/cvbi/login` を開きます。',
        ],
        template: 'h2',
      },
      {
        id: 'setup-admin', title: '3. 管理ツールの導入とライセンス登録',
        items: [
          '`WebReport51011bTrial\\WRS\\admin` を開き、`WebReportSmartAdministrator32.exe` を右クリックして「管理者として実行」を選びます。',
          '`C:\\CustomerVision\\WebReport\\CvBiMgr3u.exe`、または指定したインストール先の同名ファイルを開きます。サーバー欄に `localhost:8080/cvbi` を入力します。`http://` は付けません。',
          '管理者アカウントでログインします。新規の評価環境では、初期ユーザー名とパスワードはどちらも `cvadmin` です。他の端末からの接続を許可する前に変更します。',
          '`管理 → ライセンス → インポート` を開き、`WebReport51011bTrial` と同じ階層の `licence.cvlic` を選んで有効期限を確認します。サービスの実行アカウントに関する登録手順は、同梱の `WRS\\Doc\\ja_JP\\ライセンスの登録と解除手順.pdf` を参照します。',
        ],
      },
      {
        id: 'setup-designer', title: '4. 定義設計ツールの導入と帳票の保存',
        items: [
          '`WebReport51011bTrial\\WRS\\designer` を開き、`WebReportSmartDesigner32.exe` を右クリックして「管理者として実行」を選びます。',
          'インストール先の `CvBiDesigner.exe` を開きます。サーバー上では `localhost:8080/cvbi`、別の端末では `localhost` の代わりに Tomcat のホスト名を指定し、定義設計権限のあるアカウントでログインします。',
          '管理ツールでデータソースとテーブルを登録します。Oracle を使用する場合は先に手順 6 を実施します。定義設計ツールでテーブルと表示列を選んで試行し、閲覧権限のあるメニューフォルダーに保存します。',
        ],
      },
      {
        id: 'setup-web', title: '5. ブラウザーでログインして帳票を実行',
        items: [
          'サーバーで `http://localhost:8080/cvbi/login` を開きます。別の端末では案内された Tomcat サーバーのアドレスを使用します。',
          '閲覧者のアカウントでログインします。メニューツリーで帳票を開き、条件を入力して結果を確認します。帳票が表示されない場合は保存先と閲覧権限を確認します。',
          'ログイン画面が表示されない場合は、`services.msc` の `Tomcat9` の状態、`webapps\\cvbi.war` の配置、`C:\\WebReport\\Tomcat9\\logs` の最新ログを確認します。',
        ],
      },
      {
        id: 'setup-oracle', title: '6. Oracle を使う帳票向けの JDBC 設定',
        items: [
          '[[oracle]]を開きます。使用する Oracle Database と Java 21 に対応する版を選びます。ダウンロード表で Java 21 に対応した `ojdbc11.jar` を選び、JAR ファイルを保存します。',
          '`Tomcat9` を停止し、JAR ファイルを `C:\\WebReport\\Tomcat9\\lib` にコピーします。`conf\\context.xml` を開き、別名の Resource（例：`jdbc/OracleReports`）を `</Context>` の直前に追加します。H2 の `jdbc/CVDB` は残します。',
          '以下の Oracle の設定例はサービス名を指定する TCP 接続用です。`ORACLE_HOST`、`ORACLE_SERVICE`、`ORACLE_USER`、パスワードを管理者の指定値に変更します。TCPS やウォレットを使う場合は、管理者から指定された設定を使用します。',
          'Tomcat を再起動します。管理ツールで `jdbc/OracleReports` を参照するデータソースを登録し、接続をテストしてから必要なテーブルやビューを登録します。',
        ],
        labels: {oracle: 'Oracle の JDBC ドライバーダウンロードページ'},
        template: 'oracle',
      },
    ],
  },
};

function inline(text, labels) {
  return text.split(/(`[^`]+`|\[\[\w+\]\])/).map((part, index) => {
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('[[')) {
      const id = part.slice(2, -2);
      return <a key={index} href={downloads[id]}>{labels[id]}</a>;
    }
    return part;
  });
}

export function InstallationGuide({language}) {
  const guide = guideByLanguage[language];

  return (
    <section className="installation-guide" id="setup">
      <h2>{guide.title}</h2>
      <p>{guide.intro}</p>
      {guide.steps.map(({id, title, items, labels, template}, groupIndex) => {
        const example = templates[template];
        return (
          <React.Fragment key={id}>
            <h3 id={id}>{title}</h3>
            <ol className="steps">
              {items.map((item, itemIndex) => (
                <li key={item} data-step={`${groupIndex}.${itemIndex + 1}`}>
                  <p>{inline(item, labels)}</p>
                </li>
              ))}
            </ol>
            {example && (
              <section className="code">
                <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(example.text + '\n')}`} download={example.name}>
                  {guide.save} {example.name}
                </a>
                <pre>{example.text}</pre>
              </section>
            )}
          </React.Fragment>
        );
      })}
    </section>
  );
}
