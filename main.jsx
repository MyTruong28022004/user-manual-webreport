import React from 'react';
import {createRoot} from 'react-dom/client';
import {Theme, defineTheme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';


const oceanTheme = defineTheme({name: 'webreport-ocean', color: {accent: '#075985', neutralStyle: 'cool', contrast: 'standard'}, typography: {scale: {base: 16, ratio: 1.2}}});
const images = import.meta.glob('./assets/captures/*.png', {eager: true, query: '?inline', import: 'default'});
const capture = name => images['./assets/captures/' + name];
const sections=[
 {id:'admin',tag:'01 / ADMIN',title:'Chuẩn bị trong Admin',intro:'Kiểm tra nguồn dữ liệu và quyền truy cập trước khi tạo điều kiện tìm kiếm.',steps:[
  ['Mở công cụ quản trị','Khởi động công cụ WebReport từ thư mục cài đặt và đăng nhập bằng tài khoản được cấp.','Screenshot 2026-11-18 104418.png'],
  ['Mở danh sách đối tượng','Trong công cụ quản trị, mở khu vực quản lý dữ liệu và tìm nguồn dữ liệu dùng cho báo cáo.','Screenshot 2026-11-18 104511.png'],
  ['Kiểm tra nguồn và trường dữ liệu','Chọn nguồn liên quan, xem các trường có thể dùng làm điều kiện Search. Ghi lại tên trường và kiểu dữ liệu để đối chiếu trong Design.','Screenshot 2026-11-18 104713.png']
 ]},
 {id:'design',tag:'02 / DESIGN',title:'Tạo điều kiện Search trong Design',intro:'Mở báo cáo cần chỉnh sửa, thêm điều kiện tìm kiếm và kiểm tra thuộc tính của từng trường.',steps:[
  ['Mở báo cáo trong Design','Khởi động công cụ thiết kế, đăng nhập và chọn báo cáo cần chỉnh sửa từ danh sách.','Screenshot 2026-11-18 095940.png'],
  ['Chọn vùng điều kiện','Trong màn hình thiết kế, xác định vùng điều kiện tìm kiếm của báo cáo và chọn trường cần cấu hình.','Screenshot 2026-11-18 101917.png'],
  ['Thiết lập trường Search','Mở hộp thoại thuộc tính của trường. Đối chiếu tên hiển thị, trường dữ liệu và các tùy chọn với yêu cầu báo cáo trước khi xác nhận.','Screenshot 2026-11-18 102243.png'],
  ['Kiểm tra lựa chọn và định dạng','Nếu trường cần danh sách lựa chọn hoặc thiết lập bổ sung, mở phần cấu hình tương ứng và kiểm tra giá trị được hiển thị.','Screenshot 2026-11-18 102357.png'],
  ['Lưu và kiểm tra lại','Hoàn tất các thuộc tính, lưu thiết kế theo quy trình của hệ thống rồi mở báo cáo trên Web để kiểm tra.','Screenshot 2026-11-18 102549.png']
 ]},
 {id:'web',tag:'03 / WEB',title:'Kiểm tra trên WebReport',intro:'Sau khi cập nhật thiết kế, mở báo cáo trên Web và thử tìm kiếm bằng dữ liệu thực tế.',steps:[
  ['Đăng nhập WebReport','Mở trang WebReport và đăng nhập bằng tài khoản có quyền xem báo cáo.','Screenshot 2026-11-18 102925.png'],
  ['Chọn báo cáo và nhập điều kiện','Chọn báo cáo từ menu bên trái. Kiểm tra các trường Search vừa thiết lập ở phía trên vùng kết quả.','Screenshot 2026-11-18 103024.png'],
  ['Chạy tìm kiếm','Nhập hoặc chọn điều kiện phù hợp, sau đó nhấn nút tìm kiếm trên màn hình báo cáo.','Screenshot 2026-11-18 103036.png'],
  ['Đối chiếu kết quả','Kiểm tra dữ liệu trả về và thử thay đổi điều kiện để xác nhận bộ lọc hoạt động như mong muốn.','Screenshot 2026-11-18 103141.png']
 ]}
];
function Step({step,index}){return <VStack gap={3} as="article"><HStack gap={3} vAlign="start"><Text type="large" color="accent" weight="bold">{String(index+1).padStart(2,'0')}</Text><VStack gap={2}><Heading level={3}>{step[0]}</Heading><Text as="p" type="large" color="secondary">{step[1]}</Text></VStack></HStack><figure><a href={capture(step[2])} target="_blank" rel="noreferrer"><img src={capture(step[2])} alt={'Ảnh minh họa: '+step[0]} loading="lazy" style={{width:'100%',border:'var(--border-width-thin) solid var(--color-border)',borderRadius:'var(--radius-md)'}} /></a><Text as="p" type="supporting">Ảnh màn hình thực tế · Chọn ảnh để xem kích thước đầy đủ</Text></figure></VStack>}
function App(){return <Theme theme={oceanTheme} mode="light"><VStack as="header" paddingInline={8} paddingBlock={4} style={{background:'var(--color-background-inverted)',color:'var(--color-on-dark)'}}><HStack hAlign="between" vAlign="center" wrap="wrap" gap={3}><HStack gap={3} vAlign="center"><Text type="large" weight="bold" color="inherit">W /</Text><VStack><Text weight="bold" color="inherit">WebReport</Text><Text type="supporting" color="inherit">USER MANUAL ? 2.0 SMART</Text></VStack></HStack><Button label="Mở WebReport ↗" variant="secondary" href="http://okyt1apa.t1apsn.okytkyvcn.oraclevcn.com:8090/cvbi/login" target="_blank" /></HStack></VStack><VStack as="main" gap={10} padding={8} maxWidth="calc(var(--spacing-10) * 25)" style={{marginInline:'auto'}}><VStack gap={5}><Text color="accent" weight="bold">HƯỚNG DẪN SỬ DỤNG / SEARCH COMPONENT</Text><Heading level={1}>Tạo điều kiện tìm kiếm<br/>trong WebReport</Heading><Text as="p" type="large" color="secondary">Hướng dẫn từng bước từ chuẩn bị dữ liệu trong Admin, thiết kế điều kiện trong Design đến kiểm tra kết quả trên Web.</Text><HStack gap={2} wrap="wrap"><Button label="Bắt đầu với Admin →" href="#admin" variant="primary"/><Button label="Đến phần Design" href="#design" variant="secondary"/></HStack></VStack><VStack as="section" gap={5} padding={6} style={{background:'var(--color-background-inverted)', color:'var(--color-on-dark)', borderRadius:'var(--radius-md)'}} aria-label="Quy tr?nh th?c hi?n"><HStack hAlign="between" wrap="wrap" gap={2}><Text weight="bold" color="inherit">QUY TR?NH TH?C HI?N</Text><Text type="supporting" color="inherit">3 GIAI ?O?N ? T? D? LI?U ??N K?T QU?</Text></HStack><HStack gap={4} wrap="wrap" vAlign="center">{[['01','ADMIN','Chu?n b? d? li?u','admin'],['02','DESIGN','T?o ?i?u ki?n Search','design'],['03','WEB','Ki?m tra k?t qu?','web']].map(([number,title,detail,id],i)=><React.Fragment key={id}><VStack gap={2} padding={4} style={{flex:'1 1 var(--spacing-12)',minWidth:'calc(var(--spacing-10) * 5)',border:'var(--border-width-thin) solid var(--color-border-emphasized)',borderRadius:'var(--radius-md)'}}><Text type="supporting" color="inherit">B??C {number}</Text><a href={'#'+id} style={{color:'inherit',textDecoration:'none'}}><Text type="large" weight="bold" color="inherit">{title} ?</Text></a><Text color="inherit">{detail}</Text></VStack>{i<2 && <Text type="large" color="inherit" aria-hidden="true">?</Text>}</React.Fragment>)}</HStack></VStack><HStack gap={3} wrap="wrap" as="nav" aria-label="Mục lục"><Text weight="bold">Trong hướng dẫn này:</Text><a href="#admin">Admin</a><a href="#design">Design</a><a href="#web">Web</a><a href="#check">Kiểm tra</a></HStack><Divider/>{sections.map(section=><VStack key={section.id} as="section" id={section.id} gap={8}><VStack gap={3}><Text color="accent" weight="bold">{section.tag}</Text><Heading level={2}>{section.title}</Heading><Text as="p" type="large" color="secondary">{section.intro}</Text></VStack>{section.steps.map((step,i)=><Step key={step[0]} step={step} index={i}/>)}<Divider/></VStack>)}<VStack as="section" id="check" gap={4}><Text color="accent" weight="bold">KIỂM TRA CUỐI CÙNG</Text><Heading level={2}>Trước khi bàn giao</Heading><Text as="p" type="large">Kiểm tra tên và kiểu dữ liệu của từng trường, quyền truy cập báo cáo, giá trị lựa chọn và kết quả khi thay đổi điều kiện tìm kiếm.</Text><Card><Text type="large">Nếu trường không xuất hiện hoặc kết quả chưa đúng, đối chiếu lại cấu hình trong Design và nguồn dữ liệu trong Admin, sau đó kiểm tra lại trên Web.</Text></Card></VStack><Divider/><Text type="supporting">WebReport 2.0 Smart · Hướng dẫn tạo điều kiện tìm kiếm</Text></VStack></Theme>}

createRoot(document.getElementById('root')).render(<App/>);

