import {ManualLayout} from './manual-layout.jsx';
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
export const sections=[
 {id:'admin',tag:'01 / ADMIN',title:'Chuẩn bị trong Admin',intro:'Kiểm tra nguồn dữ liệu và quyền truy cập trước khi tạo điều kiện tìm kiếm.',steps:[
  ['Mở công cụ quản trị','Khởi động công cụ WebReport từ thư mục cài đặt và đăng nhập bằng tài khoản được cấp.','admin-dang-nhap.png'],
  ['Mở danh sách đối tượng','Trong công cụ quản trị, mở khu vực quản lý dữ liệu và tìm nguồn dữ liệu dùng cho báo cáo.','admin-danh-sach-doi-tuong.png'],
  ['Chọn schema và bảng','Trong Schema Definition, chọn schema vật lý và thêm bảng cần dùng. Ảnh minh họa dùng schema DEV; tên schema và bảng của ví dụ PostgreSQL trong tài liệu khác với ảnh.','admin-chon-schema-va-bang.png']
 ]},
 {id:'design',tag:'02 / DESIGN',title:'Tạo điều kiện Search trong Design',intro:'Mở báo cáo cần chỉnh sửa, thêm điều kiện tìm kiếm và kiểm tra thuộc tính của từng trường.',steps:[
  ['Mở báo cáo trong Design','Khởi động công cụ thiết kế, đăng nhập và chọn báo cáo cần chỉnh sửa từ danh sách.','design-chon-bao-cao.png'],
  ['Mở Search Condition','Chọn tab 検索条件 (Search Condition). Mỗi dòng gồm trường lọc, điều kiện so sánh và giá trị hoặc công thức. Ảnh là một báo cáo thực tế khác, dùng để minh họa vị trí các cột.','design-dieu-kien-tim-kiem.png']
 ]},
 {id:'web',tag:'03 / WEB',title:'Kiểm tra trên WebReport',intro:'Sau khi cập nhật thiết kế, mở báo cáo trên Web và thử tìm kiếm bằng dữ liệu thực tế.',steps:[
  ['Đăng nhập WebReport','Mở trang WebReport và đăng nhập bằng tài khoản có quyền xem báo cáo.','web-dang-nhap.png'],
  ['Chọn báo cáo và nhập điều kiện','Chọn báo cáo từ menu bên trái. Kiểm tra các trường Search vừa thiết lập ở phía trên vùng kết quả.','web-chon-bao-cao.png'],
  ['Chạy tìm kiếm','Nhập hoặc chọn điều kiện phù hợp, sau đó nhấn nút tìm kiếm trên màn hình báo cáo.','web-ket-qua-tim-kiem.png'],
  ['Đối chiếu kết quả','Kiểm tra dữ liệu trả về và thử thay đổi điều kiện để xác nhận bộ lọc hoạt động như mong muốn.','web-doi-chieu-bao-cao.png']
 ]}
];
export function Step({step,index}){return <VStack gap={3} as="article"><HStack gap={3} vAlign="start"><Text type="large" color="accent" weight="bold">{String(index+1).padStart(2,'0')}</Text><VStack gap={2}><Heading level={3}>{step[0]}</Heading><Text as="p" type="large" color="secondary">{step[1]}</Text></VStack></HStack><figure><a href={capture(step[2])} target="_blank" rel="noreferrer"><img src={capture(step[2])} alt={'Ảnh minh họa: '+step[0]} loading="lazy" style={{width:'100%',border:'var(--border-width-thin) solid var(--color-border)',borderRadius:'var(--radius-md)'}} /></a><Text as="p" type="supporting">Ảnh màn hình thực tế · Chọn ảnh để xem kích thước đầy đủ</Text></figure></VStack>}
createRoot(document.getElementById('root')).render(<Theme theme={oceanTheme} mode="light"><ManualLayout sections={sections} Step={Step} capture={capture}/></Theme>);
