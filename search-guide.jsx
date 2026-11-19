import React from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {Banner} from '@astryxdesign/core/Banner';
import {Divider} from '@astryxdesign/core/Divider';

const controls = [
  {id:'search-db', title:'Code · Pulldown từ query', field:'code', condition:'=', formula:"@INPUT(@NAME('Code'),@SEQ(1),@ENABLE(7),\n@SELDB('My Report','SampleReports','SearchCodeMaster','display_label;code'),'')", detail:'Tạo và chạy query phụ SearchCodeMaster trước. Query lấy display_label, code và display_order từ search_code_master; sắp xếp display_order tăng dần và lưu vào My Report > SampleReports. Người dùng thấy display_label, còn giá trị lọc là code. Kiểm tra quyền chạy query phụ và đúng tên menu, folder, definition, field nếu danh sách rỗng.'},
  {id:'search-text', title:'Text · Nhập văn bản', field:'free_text', condition:'= hoặc contains', formula:"@INPUT(@NAME('Text'),@SEQ(2),@ENABLE(7),@WIDTH(180),'')", detail:'Chọn điều kiện bằng (=) để khớp chính xác hoặc contains để tìm theo nội dung, tùy yêu cầu. Phép so sánh được chọn ở cột Condition, không nằm trong công thức.'},
  {id:'search-date', title:'Date · Chọn ngày', field:'target_date', condition:'=', formula:"@INPUT(@NAME('Date'),@SEQ(3),@ENABLE(7),@CALENDER('YYYY-MM-DD'),'')", detail:'Chọn trường ngày và định dạng YYYY-MM-DD. Tên hàm trong WebReport là @CALENDER; giữ đúng chính tả này khi nhập.'},
  {id:'search-check', title:'Active · Checkbox', field:'active_code', condition:'=', formula:"@INPUT(@NAME('Active'),@SEQ(4),@ENABLE(7),@CHECKBOX('Active;1'),'')", detail:'Dùng trường search kiểu varchar chứa giá trị 1 hoặc 0. Khi chọn, checkbox gửi chuỗi 1; khi không chọn, giá trị rỗng và điều kiện tùy chọn được bỏ qua. Kiểm tra giá trị thực tế trong DB trước khi thử.'},
  {id:'search-fixed', title:'Year · Pulldown cố định', field:'fiscal_year', condition:'=', formula:"@INPUT(@NAME('Year'),@SEQ(5),@ENABLE(7),\n@SEL('2024;2024','2025;2025','2026;2026'),'')", detail:'Mỗi lựa chọn có dạng Display;Value. Thay các năm bằng danh sách phù hợp với báo cáo và kiểm tra giá trị gửi đi tương thích kiểu dữ liệu của field.'},
  {id:'search-checkdb', title:'Category · Checkbox từ query', field:'Trường mã category của báo cáo', condition:'=', formula:"@INPUT(@NAME('Category'),@SEQ(6),@ENABLE(7),\n@CHECKBOXDB('My Report','SampleReports','CategoryMasterQuery',\n'display_name;category_code'),'')", detail:'Đây là ví dụ mở rộng: cần tự tạo CategoryMasterQuery và các trường display_name, category_code trước; ví dụ SearchControlsDemoReport cơ bản không bao gồm query này. Manual được trích trong tài liệu nêu giới hạn 100 lựa chọn.'},
];

export function SearchGuide({capture}) {
  return <VStack as="section" id="cau-hinh-search" gap={8}>
    <Divider/><VStack gap={3}><Text color="accent" weight="bold">DESIGN / SEARCH CONDITION</Text><Heading level={2}>Cấu hình từng trường Search</Heading><Text as="p" type="large" color="secondary">Ví dụ dưới đây dùng report SearchControlsDemoReport và dữ liệu PostgreSQL được mô tả trong tài liệu nguồn. Tên trường, menu và query cần đổi theo môi trường của bạn.</Text></VStack>
    <Banner status="info" title="Đọc ảnh và ví dụ cùng nhau" description="Các ảnh hiện có được chụp từ báo cáo thực tế khác, không phải SearchControlsDemoReport. Ảnh giúp xác định vị trí thao tác; tên field và công thức mẫu bên dưới lấy từ tài liệu bạn cung cấp." />
    <VStack gap={3}><Heading level={3}>1. Chuẩn bị trước khi thêm điều kiện</Heading>
      <Text as="p" type="large">Trong Management Tool, mở Data Resource, đăng ký schema, bảng và field; tạo menu/folder và cấp quyền. Trong Designer, tạo report chính từ search_demo_data và lưu vào My Report &gt; SampleReports. Với pulldown từ DB, tạo query phụ SearchCodeMaster trước.</Text>
      <HStack gap={2} wrap="wrap"><Text color="accent" weight="bold">DB / JNDI</Text><Text>→ Data Resource → Schema → Table / Field → Menu / quyền → Query phụ → Report chính → Search Condition → Web</Text></HStack>
    </VStack>
    <VStack gap={3}><Heading level={3}>2. Nhập một dòng Search Condition</Heading>
      <Text as="p" type="large">Mở tab 検索条件 (Search Condition). Ở một dòng, chọn Item name là field lọc; chọn Condition như = hoặc contains; tại cột Value / Formula nhập công thức @INPUT. Lặp lại cho từng control, sau đó lưu report.</Text>
      <figure><a href={capture('design-dieu-kien-tim-kiem.png')} target="_blank" rel="noreferrer"><img src={capture('design-dieu-kien-tim-kiem.png')} alt="Tab Search Condition: các cột Item name, Condition và Value / Formula với các công thức trong một báo cáo khác" loading="lazy" style={{width:'100%',borderRadius:'var(--radius-md)'}} /></a><Text as="p" type="supporting">Ảnh thực tế: tab Search Condition và các công thức @INPUT của một báo cáo khác. Chọn ảnh để phóng to.</Text></figure>
      <CodeBlock code={"@INPUT(@NAME('Label'),@SEQ(thứ_tự),@ENABLE(chế_độ),control,default)"} language="plaintext" width="100%" isWrapped />
      <Text as="p">@NAME đặt nhãn; @SEQ xác định thứ tự; @ENABLE xác định cách chọn điều kiện và nhập giá trị; control xác định kiểu ô nhập. Với ví dụ tùy chọn, @ENABLE(7) cho phép chọn điều kiện và để trống; @ENABLE(5) giữ điều kiện cố định và cho phép để trống.</Text>
    </VStack>
    <VStack gap={6}><Heading level={3}>3. Chọn kiểu trường và nhập công thức</Heading>
      {controls.map(item=><VStack as="article" id={item.id} key={item.id} gap={3}>
        <Divider/><Heading level={3}>{item.title}</Heading><Text color="secondary">Field lọc: {item.field}　·　Condition: {item.condition}</Text>
        <Text as="p" type="large">{item.detail}</Text><CodeBlock title="Value / Formula" code={item.formula} language="plaintext" width="100%" isWrapped />
      </VStack>)}
    </VStack>
    <Banner status="warning" title="Nếu checkbox báo APLB100020" description="Kiểm tra kiểu field và value: checkbox tạo giá trị chuỗi có dấu nháy. Nếu field là boolean hoặc numeric, dùng field/view search kiểu varchar, đăng ký lại metadata và bảo đảm giá trị trong DB khớp với '1'." />
    <VStack gap={3}><Heading level={3}>4. Lưu và kiểm thử trên Web</Heading><Text as="p" type="large">Lưu report vào đúng menu/folder, mở lại báo cáo trên Web, rồi thử từng control và tổ hợp điều kiện. Kiểm tra giá trị hiển thị và giá trị lọc của Code, text, ngày, Active, năm và paging. Nếu định nghĩa chưa cập nhật, chọn report khác rồi mở lại hoặc dùng Ctrl+F5.</Text><Text color="secondary">Với bộ dữ liệu mẫu được mô tả trong tài liệu nguồn: không lọc có 100 dòng, lọc Active có 67 dòng. Đây là số liệu mẫu, không áp dụng mặc định cho dữ liệu của bạn.</Text></VStack>
  </VStack>;
}
