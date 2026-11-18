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
export function Step({step,index}){return <VStack gap={3} as="article"><HStack gap={3} vAlign="start"><Text type="large" color="accent" weight="bold">{String(index+1).padStart(2,'0')}</Text><VStack gap={2}><Heading level={3}>{step[0]}</Heading><Text as="p" type="large" color="secondary">{step[1]}</Text></VStack></HStack><figure><a href={capture(step[2])} target="_blank" rel="noreferrer"><img src={capture(step[2])} alt={'Ảnh minh họa: '+step[0]} loading="lazy" style={{width:'100%',border:'var(--border-width-thin) solid var(--color-border)',borderRadius:'var(--radius-md)'}} /></a><Text as="p" type="supporting">Ảnh màn hình thực tế · Chọn ảnh để xem kích thước đầy đủ</Text></figure></VStack>}
createRoot(document.getElementById('root')).render(<Theme theme={oceanTheme} mode="light"><ManualLayout sections={sections} Step={Step} capture={capture}/></Theme>);
