import React from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';
import {SearchGuide} from './search-guide.jsx';

const stages = [
  {id:'admin', number:'01', title:'Admin', action:'Chuẩn bị dữ liệu', output:'Nguồn dữ liệu & trường tìm kiếm'},
  {id:'design', number:'02', title:'Design', action:'Thiết kế Search', output:'Điều kiện tìm kiếm trong báo cáo'},
  {id:'web', number:'03', title:'Web', action:'Kiểm tra kết quả', output:'Báo cáo sẵn sàng sử dụng'},
];
const paths = {
  admin: ['Đăng nhập Admin', 'Chọn nguồn dữ liệu', 'Kiểm tra trường'],
  design: ['Mở báo cáo', 'Chọn vùng điều kiện', 'Cấu hình Search', 'Lưu thiết kế'],
  web: ['Mở báo cáo', 'Nhập điều kiện', 'Tìm kiếm', 'Đối chiếu kết quả'],
};
const panel = {background:'var(--color-background-surface)', border:'var(--border-width-thin) solid var(--color-border-emphasized)', borderRadius:'var(--radius-md)'};

function Pipeline({items}) {
  return <HStack gap={2} wrap="wrap" vAlign="center" aria-label="Các bước thực hiện">
    {items.map((item, index) => <React.Fragment key={item}>
      <HStack gap={2} vAlign="center" padding={3} style={{...panel, flex:'1 1 var(--spacing-12)', minWidth:'calc(var(--spacing-10) * 4)'}}>
        <Text weight="bold" color="accent">{String(index + 1).padStart(2, '0')}</Text>
        <Text weight="semibold">{item}</Text>
      </HStack>
      {index < items.length - 1 && <Text color="accent" weight="bold" aria-hidden="true">→</Text>}
    </React.Fragment>)}
  </HStack>;
}

export function ManualLayout({sections, Step, capture}) {
  return <>
    <HStack as="header" paddingInline={8} paddingBlock={4} gap={4} wrap="wrap" hAlign="between" vAlign="center" style={{borderBottom:'var(--border-width-thin) solid var(--color-border-emphasized)', background:'var(--color-background-surface)'}}>
      <HStack gap={3} vAlign="center"><Text type="large" weight="bold" color="accent">W /</Text><VStack><Text weight="bold">WebReport</Text><Text type="supporting">USER MANUAL · 2.0 SMART</Text></VStack></HStack>
      <Text color="secondary">Hướng dẫn tạo điều kiện tìm kiếm</Text>
      <Button label="Mở WebReport ↗" variant="secondary" href="http://okyt1apa.t1apsn.okytkyvcn.oraclevcn.com:8090/cvbi/login" target="_blank" />
    </HStack>
    <HStack as="main" wrap="wrap" vAlign="start" style={{background:'var(--color-background-surface)'}}>
      <VStack as="nav" aria-label="Mục lục" gap={4} padding={6} style={{flex:'1 1 calc(var(--spacing-10) * 6)', maxWidth:'calc(var(--spacing-10) * 8)', background:'var(--color-background-muted)', borderRight:'var(--border-width-thin) solid var(--color-border)'}}>
        <Text type="supporting" weight="bold">HƯỚNG DẪN SỬ DỤNG</Text>
        <a href="#tong-quan">Tổng quan</a><Divider/>
        <Text type="supporting" weight="bold">TẠO SEARCH COMPONENT</Text>
        {stages.map(stage=><a key={stage.id} href={'#'+stage.id}>{stage.number}　{stage.title} · {stage.action}</a>)}
        <a href="#cau-hinh-search">　Cấu hình từng trường Search</a>
        <Divider/><a href="#check">Kiểm tra trước bàn giao</a>
      </VStack>
      <VStack gap={10} padding={8} style={{flex:'4 1 calc(var(--spacing-10) * 18)', minWidth:0}}>
        <VStack id="tong-quan" gap={6}>
          <Text color="accent" weight="bold">WEBREPORT GUIDE / SEARCH COMPONENT</Text>
          <HStack gap={8} wrap="wrap" vAlign="center">
            <VStack gap={5} style={{flex:'1 1 calc(var(--spacing-10) * 9)'}}>
              <Heading level={1}>Tạo điều kiện tìm kiếm trong WebReport</Heading>
              <Text as="p" type="large" color="secondary">Đi từ nguồn dữ liệu đến báo cáo hoàn chỉnh. Theo dõi từng bước trong Admin, Design và Web cùng ảnh chụp màn hình thực tế.</Text>
              <HStack gap={2} wrap="wrap"><Button label="Bắt đầu hướng dẫn →" href="#admin" variant="primary"/><Button label="Xem quy trình" href="#pipeline" variant="secondary"/></HStack>
              <Text type="supporting">03 giai đoạn　·　Ảnh minh họa thực tế　·　Hướng dẫn từng bước</Text>
            </VStack>
            <VStack gap={2} padding={3} style={{...panel, flex:'1 1 calc(var(--spacing-10) * 9)'}}>
              <Text type="supporting">WEBREPORT 2.0 SMART / REPORT VIEW</Text>
              <a href={capture('Screenshot 2026-11-18 103036.png')} target="_blank" rel="noreferrer"><img src={capture('Screenshot 2026-11-18 103036.png')} alt="Màn hình WebReport với điều kiện tìm kiếm và bảng kết quả có dữ liệu" style={{display:'block',width:'100%',borderRadius:'var(--radius-md)'}} /></a>
              <Text type="supporting">Từ cấu hình trong Design đến kết quả trên Web</Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack id="pipeline" gap={5} padding={6} style={{background:'var(--color-background-blue)',borderRadius:'var(--radius-md)'}}>
          <VStack gap={2}><Text color="accent" weight="bold">QUY TRÌNH TỔNG THỂ</Text><Heading level={2}>Một Search, ba giai đoạn</Heading><Text color="secondary">Đầu ra của mỗi giai đoạn là đầu vào cho bước tiếp theo.</Text></VStack>
          <HStack gap={3} wrap="wrap" vAlign="center">
            {stages.map((stage,index)=><React.Fragment key={stage.id}>
              <VStack gap={2} padding={4} style={{...panel, flex:'1 1 calc(var(--spacing-10) * 5)'}}>
                <Text color="accent" weight="bold">{stage.number} / {stage.title.toUpperCase()}</Text>
                <Heading level={3}>{stage.action}</Heading>
                <Text type="supporting">Đầu ra: {stage.output}</Text>
                <a href={'#'+stage.id}>Xem hướng dẫn →</a>
              </VStack>
              {index < stages.length - 1 && <Text type="large" color="accent" weight="bold" aria-hidden="true">→</Text>}
            </React.Fragment>)}
          </HStack>
        </VStack>
        {sections.map(section=><VStack key={section.id} as="section" id={section.id} gap={8}>
          <Divider/><VStack gap={3}><Text color="accent" weight="bold">{section.tag}</Text><Heading level={2}>{section.title}</Heading><Text as="p" type="large" color="secondary">{section.intro}</Text></VStack>
          <VStack gap={3}><Text weight="bold">LUỒNG THỰC HIỆN</Text><Pipeline items={paths[section.id]}/></VStack>
          {section.steps.map((step,i)=><Step key={step[0]} step={step} index={i}/>)}
          {section.id === 'design' && <SearchGuide capture={capture}/>}
        </VStack>)}
        <Divider/><VStack as="section" id="check" gap={4}><Text color="accent" weight="bold">KIỂM TRA CUỐI CÙNG</Text><Heading level={2}>Trước khi bàn giao</Heading><Text as="p" type="large">Kiểm tra tên và kiểu dữ liệu của từng trường, quyền truy cập báo cáo, giá trị lựa chọn và kết quả khi thay đổi điều kiện tìm kiếm.</Text><Text as="p" color="secondary">Nếu trường không xuất hiện hoặc kết quả chưa đúng, đối chiếu lại cấu hình trong Design và nguồn dữ liệu trong Admin, sau đó kiểm tra lại trên Web.</Text></VStack>
        <Divider/><Text type="supporting">WebReport 2.0 Smart · Hướng dẫn tạo điều kiện tìm kiếm</Text>
      </VStack>
    </HStack>
  </>;
}
