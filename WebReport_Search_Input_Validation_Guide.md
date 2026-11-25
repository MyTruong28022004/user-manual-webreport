# WebReport 2.0 Smart - Hướng dẫn đầy đủ Input, Search Condition và Validation

## 1. Mục đích và phạm vi

Tài liệu này tổng hợp các loại input có thể dùng trong **vùng Search của Query/Report** trên WebReport 2.0 Smart, bao gồm:

- Tất cả hàm chuyên dụng được phép đặt bên trong `@INPUT`.
- Input text, pulldown tĩnh, pulldown từ DB, multi-select, checkbox, radio và calendar.
- Cách đặt label, hướng dẫn, thứ tự, chia dòng, độ rộng và giá trị mặc định.
- Các Search Condition hỗ trợ cho character, numeric, date, time và datetime.
- Những validation làm được trực tiếp, làm được gián tiếp và không được WebReport Search hỗ trợ.
- Ví dụ, giới hạn và lỗi thường gặp.

Tài liệu này nói về **Search Condition của report tiêu chuẩn**. Validation của màn hình nhập/cập nhật dữ liệu tạo bằng Form Design là một phạm vi khác.

## 2. Tài liệu nguồn

Nguồn chính:

```text
WebReport51011bTrial\WRS\Doc\en_US\UsersManual.pdf
```

Các phần cần đọc:

| Nội dung | Vị trí trong manual |
|---|---|
| Tạo và sửa Query Definition | Chapter 3 - Report Designer's Manual, mục 2 |
| Cấu hình Search Condition | Chapter 3, khoảng trang 98-100 |
| Danh sách hàm `@INPUT` | Appendix 1.5 - INPUT functions, trang 171-176 |
| Công thức/hàm dùng trong Value/formula | Appendix 1 - Reference, từ khoảng trang 160 |

Đường dẫn tài liệu trên máy hiện tại:

```text
C:\wsrc\WebReport検証結果の共有\webreport20smart-5.10.11.b-20261231\webreport20smart-5.10.11.b-20261231\WebReport51011bTrial\WRS\Doc\en_US\UsersManual.pdf
```

## 3. Cấu trúc chung của `@INPUT`

Cú pháp được manual mô tả:

```text
@INPUT(@DedicatedFunction(argument), @DedicatedFunction(argument), ..., DefaultValue)
```

Ví dụ text đơn giản:

```text
@INPUT(
    @NAME("Text"),
    @GUIDE("Enter part of the description"),
    @SEQ(11),
    @WIDTH(180),
    @ENABLE(7),
    ''
)
```

Ý nghĩa:

- `@NAME`: label hiển thị.
- `@GUIDE`: hướng dẫn khi focus vào input.
- `@SEQ`: thứ tự và dòng hiển thị.
- `@WIDTH`: chiều rộng input.
- `@ENABLE`: cho sửa, cho chọn condition và có cho phép bỏ trống hay không.
- Tham số cuối cùng: giá trị mặc định.

> Lưu ý: cú pháp trong phần mềm thường được nhập trên một dòng. Các ví dụ xuống dòng trong tài liệu này chỉ để dễ đọc.

## 4. Danh sách đầy đủ hàm bên trong `@INPUT`

| Hàm | Chức năng |
|---|---|
| `@NAME` | Đặt label cho input |
| `@GUIDE` | Hiển thị hướng dẫn nhập |
| `@CONDITION` | Cho phép/không cho phép người dùng đổi toán tử Search Condition |
| `@SEQ` | Đặt thứ tự, chia dòng và chia khung |
| `@ENABLE` | Bật/tắt condition, input và quy định được phép bỏ trống |
| `@WIDTH` | Đặt chiều rộng input theo pixel |
| `@SEL` | Pulldown một lựa chọn, dữ liệu cố định |
| `@SEL2` | Pulldown nhiều lựa chọn, dữ liệu cố định |
| `@SELDB` | Pulldown một lựa chọn, load dữ liệu từ Query Definition |
| `@SELDB2` | Pulldown nhiều lựa chọn, load dữ liệu từ Query Definition |
| `@CHECKBOX` | Checkbox với giá trị cố định |
| `@CHECKBOXDB` | Checkbox load giá trị từ Query Definition |
| `@RADIO` | Radio button với giá trị cố định |
| `@RADIODB` | Radio button load giá trị từ Query Definition |
| `@CALENDER` | Nút calendar và định dạng ngày. Manual dùng đúng chính tả `CALENDER` |
| `@GET` | Nhận biến từ report gọi đến qua link |
| `@SET` | Ghi input vào biến để truyền qua link |
| `@UPPER` | Chuyển text nhập vào thành chữ hoa |
| `@LOWER` | Chuyển text nhập vào thành chữ thường |
| `@SHARE` | Dùng chung một input cho nhiều Search Condition |
| `@EXCEL` | Ghi thông tin filter vào một cell khi export XLS |

## 5. Text input - nhập tự do

Text input là `@INPUT` không dùng `@SEL`, `@CHECKBOX`, `@RADIO` hoặc `@CALENDER`.

### Ví dụ 1 - tìm kiếm chứa chuỗi

Value/formula:

```text
@INPUT(@NAME("Text"),@GUIDE("Enter text"),@SEQ(11),@WIDTH(180),@ENABLE(7),'')
```

Search Condition:

```text
Item name : free_text
Condition : Contains Character
```

### Ví dụ 2 - nhập code và tự đổi sang chữ hoa

```text
@INPUT(@NAME("Code"),@GUIDE("Example: C001"),@UPPER(),@SEQ(11),@WIDTH(100),@ENABLE(7),'')
```

Search Condition:

```text
Item name : code
Condition : =
```

### Khả năng validation

- Nếu field đích là Numeric mà nhập chữ, WebReport có thể báo lỗi sai kiểu khi thực thi.
- Nếu field đích là Date/Datetime mà giá trị không chuyển đổi được, truy vấn có thể báo lỗi kiểu hoặc lỗi DB.
- Không có regex, `maxlength`, `minlength` hoặc custom error message trong `@INPUT` tiêu chuẩn.
- `@GUIDE` chỉ hướng dẫn, không chặn dữ liệu sai.

## 6. `@NAME` - đặt label

Cú pháp:

```text
@NAME("DisplayName")
```

### Ví dụ 1

```text
@INPUT(@NAME("Company Code"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("From Date"),@CALENDER("YYYY-MM-DD"),@ENABLE(7),'')
```

Nếu bỏ `@NAME`, WebReport dùng tên item mặc định kèm dấu `:`.

## 7. `@GUIDE` - hướng dẫn nhập

Cú pháp:

```text
@GUIDE("Text displayed as a guide")
```

### Ví dụ 1

```text
@INPUT(@NAME("Year"),@GUIDE("Enter four digits"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Amount"),@GUIDE("Numbers only; do not enter commas"),@ENABLE(7),'')
```

`@GUIDE` không phải validation. Nó chỉ giúp giảm lỗi nhập liệu.

## 8. `@CONDITION` - cho phép đổi toán tử

Cú pháp:

```text
@CONDITION(1)
@CONDITION(0)
```

| Giá trị | Ý nghĩa |
|---:|---|
| `1` | Người dùng được chọn Search Condition khi chạy report |
| `0` | Không cho người dùng đổi Search Condition |

### Ví dụ 1 - cho đổi toán tử

```text
@INPUT(@NAME("Amount"),@CONDITION(1),@ENABLE(3),0)
```

Người dùng có thể chọn `=`, `>`, `>=`, `Range`... tùy kiểu field.

### Ví dụ 2 - cố định điều kiện

```text
@INPUT(@NAME("Company Code"),@CONDITION(0),@ENABLE(7),'')
```

Nên dùng `@CONDITION(0)` khi business rule không cho người dùng thay đổi toán tử.

## 9. `@SEQ` - thứ tự, chia dòng và chia khung

Cú pháp:

```text
@SEQ(ViewOrderNumber)
```

Giá trị hợp lệ theo manual: `1` đến `32767`.

Quy tắc:

- WebReport sắp xếp các ô từ trái sang phải theo giá trị `@SEQ` tăng dần. Dùng `@SEQ(11)` cho dòng 1, cột 1, `@SEQ(12)` cho dòng 1, cột 2 và `@SEQ(21)` cho dòng 2, cột 1.
- Khi phần hàng chục trở lên thay đổi, input chuyển sang dòng tiếp theo.
- Khi phần hàng nghìn thay đổi, input chuyển sang một framework/khung khác ở Web Execution.

### Ví dụ 1 - 5 filter mỗi dòng

```text
Dòng 1: @SEQ(11), @SEQ(12), @SEQ(13), @SEQ(14), @SEQ(15)
Dòng 2: @SEQ(21), @SEQ(22), @SEQ(23), @SEQ(24), @SEQ(25)
```

### Ví dụ 2 - ba dòng

```text
Dòng 1: @SEQ(11), @SEQ(12), @SEQ(13)
Dòng 2: @SEQ(21), @SEQ(22), @SEQ(23)
Dòng 3: @SEQ(31), @SEQ(32), @SEQ(33)
```

Không dùng `1001` chỉ để xuống dòng vì thay đổi hàng nghìn có thể tạo khung mới.

## 10. `@ENABLE` - trạng thái input và bắt buộc/không bắt buộc

Các giá trị cơ sở:

| Giá trị | Search Condition | Input area |
|---:|---|---|
| `0` | Không chọn được | Không nhập được |
| `1` | Không chọn được | Nhập được |
| `2` | Chọn được | Không nhập được |
| `3` | Chọn được | Nhập được; đây là mặc định |

Theo manual, cộng thêm `4` để cho phép Execute/Search khi không nhập giá trị. Condition trống sẽ bị bỏ qua.

| Giá trị | Diễn giải thực tế |
|---:|---|
| `4` | Condition và input bị khóa; được phép trống |
| `5` | Condition cố định; input nhập được; được phép trống |
| `6` | Condition chọn được; input bị khóa; được phép trống |
| `7` | Condition và input dùng được; được phép trống |

### Ví dụ 1 - bắt buộc nhập

```text
@INPUT(@NAME("Company Code"),@ENABLE(3),'')
```

### Ví dụ 2 - filter không bắt buộc

```text
@INPUT(@NAME("Company Code"),@ENABLE(7),'')
```

Khuyến nghị cho màn hình tìm kiếm thông thường: dùng `@ENABLE(7)` để filter trống được bỏ qua.

## 11. `@WIDTH` - chiều rộng input

Cú pháp:

```text
@WIDTH(PixelWidth)
```

### Ví dụ 1

```text
@INPUT(@NAME("Code"),@WIDTH(90),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Description"),@WIDTH(240),@ENABLE(7),'')
```

Nếu có nhiều `@WIDTH`, WebReport lấy giá trị lớn nhất. Label dài và tổng chiều rộng các input có thể làm trình duyệt tự xuống dòng dù `@SEQ` cùng nhóm.

## 12. `@SEL` - pulldown một lựa chọn, dữ liệu cố định

Cú pháp:

```text
@SEL(SelectionValue1, SelectionValue2, ...)
```

Nếu display và actual value khác nhau:

```text
"DisplayName;Value"
```

### Ví dụ 1 - năm tài chính

```text
@INPUT(@NAME("Year"),@SEL("2024;2024","2025;2025","2026;2026"),@SEQ(11),@ENABLE(7),'')
```

### Ví dụ 2 - trạng thái

```text
@INPUT(@NAME("Status"),@SEL("All;","Active;1","Inactive;0"),@ENABLE(7),'')
```

Giá trị mặc định của `@INPUT` được dùng làm lựa chọn ban đầu. Nếu không có default, manual cho biết selection đầu tiên được dùng.

Validation: người dùng chỉ chọn được giá trị khai báo, do đó phù hợp nhất với enum cố định.

## 13. `@SEL2` - pulldown nhiều lựa chọn, dữ liệu cố định

Cú pháp:

```text
@SEL2(SelectionValue1, SelectionValue2, ...)
```

### Ví dụ 1 - chọn nhiều năm

```text
@INPUT(@NAME("Years"),@SEL2("2024;2024","2025;2025","2026;2026"),@ENABLE(7),'')
```

### Ví dụ 2 - chọn nhiều trạng thái

```text
@INPUT(@NAME("Status"),@SEL2("Open;O","Processing;P","Closed;C"),@ENABLE(7),'')
```

Search Condition phù hợp thường là `One of`.

## 14. `@SELDB` - pulldown một lựa chọn từ DB/query

Cú pháp:

```text
@SELDB("MenuName","FolderName","QueryDefinitionName","FieldName")
```

Muốn display và value lấy từ hai field khác nhau:

```text
"DisplayFieldName;ValueFieldName"
```

### Ví dụ 1 - code và name

Query phụ `SearchCodeMaster` trả về:

```text
code | name
C001 | Head Office
C002 | Tokyo Branch
```

Input:

```text
@INPUT(@NAME("Code"),@SELDB("My Report","SampleReports","SearchCodeMaster","name;code"),@ENABLE(7),'')
```

Màn hình hiển thị `Head Office`, nhưng điều kiện nhận `C001`.

### Ví dụ 2 - department

```text
@INPUT(@NAME("Department"),@SELDB("My Report","Master","DepartmentList","department_name;department_code"),@ENABLE(7),'')
```

Giới hạn theo manual: tối đa `2000` item.

Điều kiện để hoạt động:

- Menu, folder và query phụ phải tồn tại.
- User phải có quyền chạy query phụ.
- Query phụ phải chạy thành công.
- Tên field phải đúng.
- Value field phải cùng kiểu dữ liệu với field đang search.

## 15. `@SELDB2` - pulldown nhiều lựa chọn từ DB/query

Cú pháp:

```text
@SELDB2("MenuName","FolderName","QueryDefinitionName","FieldName")
```

### Ví dụ 1

```text
@INPUT(@NAME("Companies"),@SELDB2("My Report","Master","CompanyList","company_name;company_code"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Categories"),@SELDB2("My Report","Master","CategoryList","category_name;category_id"),@ENABLE(7),'')
```

Giới hạn theo manual: tối đa `2000` item. Search Condition thường dùng `One of` hoặc `None of`.

## 16. `@CHECKBOX` - checkbox cố định

Cú pháp:

```text
@CHECKBOX("DisplayName;Value", ...)
```

### Ví dụ 1 - Active dạng số 0/1

```text
@INPUT(@NAME(""),@CHECKBOX("Active;1"),@SEQ(11),@ENABLE(7),'')
```

Nếu cột `is_active` là Numeric/Integer, phải truyền `1`, không truyền chuỗi `'true'`.

### Ví dụ 2 - nhiều checkbox trạng thái

```text
@INPUT(@NAME("Status"),@CHECKBOX("Open;O","Closed;C"),@ENABLE(7),'')
```

Với nhiều giá trị, dùng Search Condition tương thích như `One of`.

## 17. `@CHECKBOXDB` - checkbox load từ DB/query

Cú pháp:

```text
@CHECKBOXDB("MenuName","FolderName","QueryDefinitionName","FieldName")
```

### Ví dụ 1

```text
@INPUT(@NAME("Category"),@CHECKBOXDB("My Report","Master","CategoryList","category_name;category_code"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Status"),@CHECKBOXDB("My Report","Master","StatusList","status_name;status_code"),@ENABLE(7),'')
```

Giới hạn theo manual: tối đa `100` item. Không nên dùng checkbox cho danh sách quá dài.

## 18. `@RADIO` - radio button cố định

Cú pháp:

```text
@RADIO("DisplayName;Value", ...)
```

### Ví dụ 1

```text
@INPUT(@NAME("Active"),@RADIO("All;","Active;1","Inactive;0"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Mode"),@RADIO("Summary;S","Detail;D"),@ENABLE(3),'S')
```

Default value có thể dùng để chọn sẵn một radio.

## 19. `@RADIODB` - radio button load từ DB/query

Cú pháp:

```text
@RADIODB("MenuName","FolderName","QueryDefinitionName","FieldName")
```

### Ví dụ 1

```text
@INPUT(@NAME("Company Type"),@RADIODB("My Report","Master","CompanyTypeList","type_name;type_code"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Priority"),@RADIODB("My Report","Master","PriorityList","priority_name;priority_id"),@ENABLE(7),'')
```

Giới hạn theo manual: tối đa `100` item. Thực tế chỉ nên dùng radio với số lựa chọn nhỏ.

## 20. `@CALENDER` - nhập ngày bằng calendar

Manual sử dụng tên hàm:

```text
@CALENDER("DisplayStyle")
```

Không tự sửa thành `@CALENDAR`.

### Ví dụ 1 - một ngày

```text
@INPUT(@NAME("Target Date"),@CALENDER("YYYY-MM-DD"),@SEQ(11),@WIDTH(100),@ENABLE(7),'')
```

### Ví dụ 2 - From/To

```text
@INPUT(@NAME("From"),@CALENDER("YYYY-MM-DD"),@SEQ(11),@WIDTH(100),@ENABLE(7),'')
```

```text
@INPUT(@NAME("To"),@CALENDER("YYYY-MM-DD"),@SEQ(12),@WIDTH(100),@ENABLE(7),'')
```

Search Conditions:

```text
created_at >= From
AND
created_at <= To
```

Nếu `created_at` có cả giờ và `To` chỉ nhập ngày, `created_at <= To` có thể chỉ lấy đến `00:00:00`. Cần thiết kế điều kiện end-exclusive ở DB/query, ví dụ nhỏ hơn ngày kế tiếp, nếu công thức/DB đang dùng hỗ trợ.

`@CALENDER` hỗ trợ nhập đúng format từ nút lịch, nhưng manual không mô tả custom error message cho chuỗi ngày người dùng gõ sai.

## 21. `@GET` - nhận giá trị từ report gọi đến

Cú pháp:

```text
@GET("VariableName")
```

### Ví dụ 1

Report danh sách công ty gọi report chi tiết và truyền `company_code`:

```text
@INPUT(@NAME("Company"),@GET("company_code"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Order ID"),@GET("selected_order_id"),@ENABLE(3),'')
```

Theo manual, khi lấy được giá trị từ report gọi đến, input có `@GET` không xuất hiện trong Search window. Nếu tất cả input đều nhận được giá trị, report có thể chạy mà không hiển thị Search window.

## 22. `@SET` - ghi input vào biến

Cú pháp:

```text
@SET("VariableName")
```

### Ví dụ 1

```text
@INPUT(@NAME("Company"),@SET("company_code"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Year"),@SET("fiscal_year"),@ENABLE(7),'2026')
```

Dùng cùng link/drill-down để report sau lấy lại bằng `@GET`.

## 23. `@UPPER` và `@LOWER` - chuẩn hóa chữ hoa/thường

### Ví dụ 1 - chữ hoa

```text
@INPUT(@NAME("Code"),@UPPER(),@GUIDE("Input is converted to uppercase"),@ENABLE(7),'')
```

### Ví dụ 2 - chữ thường

```text
@INPUT(@NAME("Email"),@LOWER(),@ENABLE(7),'')
```

Đây là normalization, không phải regex validation. Nó không kiểm tra code/email có đúng cấu trúc hay không.

## 24. `@SHARE` - dùng chung một input

Cú pháp:

```text
@SHARE("VariableName")
```

`@SHARE` kết hợp nhiều `@INPUT` thành một vùng nhập liệu để cùng một giá trị áp dụng cho nhiều điều kiện.

### Ví dụ 1 - keyword tìm ở hai cột

Condition 1:

```text
company_name Contains @INPUT(@NAME("Keyword"),@SHARE("keyword"),@ENABLE(7),'')
```

Condition 2:

```text
department_name Contains @INPUT(@NAME("Keyword"),@SHARE("keyword"),@ENABLE(7),'')
```

Nối hai condition bằng `OR`.

### Ví dụ 2 - code dùng cho hai nguồn

Hai Search Condition cùng sử dụng:

```text
@INPUT(@NAME("Code"),@SHARE("common_code"),@ENABLE(7),'')
```

Manual khuyến nghị dùng `@NAME` với `@SHARE`. Nếu một input chung dùng `@ENABLE(7)`, phải đặt `@ENABLE(7)` cho tất cả input có cùng tên biến.

## 25. `@EXCEL` - ghi filter vào file XLS

Cú pháp:

```text
@EXCEL("CellPosition","FormatString")
```

### Ví dụ 1

```text
@INPUT(@NAME("Company"),@EXCEL("A5","%N: %V"),@ENABLE(7),'')
```

### Ví dụ 2

```text
@INPUT(@NAME("Year"),@EXCEL("R5C3","%N=%V"),@ENABLE(7),'')
```

Cell position hỗ trợ:

```text
A5
R5C3
R[-2]C[3]
```

Các placeholder manual liệt kê:

| Mã | Nội dung |
|---|---|
| `%I` | Item name |
| `%J` | Actual item name |
| `%N` | Tên đặt bằng `@NAME` |
| `%T` | Table name |
| `%L` | Schema/library name |
| `%O` | Schema/owner name |
| `%C` | Search condition |
| `%V` | Input value |
| `%P` | Input value theo quy định của manual |
| `%%` | Ký tự `%` |

Chỉ áp dụng khi export `.xls`; không áp dụng cho CSV hoặc SYLK và không hiển thị trong Web Execution.

## 26. Toàn bộ Search Condition có thể chọn

| Condition | Character | Numeric | Date | Time | Datetime | Ý nghĩa |
|---|:---:|:---:|:---:|:---:|:---:|---|
| `=` | Có | Có | Có | Có | Có | Bằng |
| `<` | Có | Có | Có | Có | Có | Nhỏ hơn |
| `>` | Có | Có | Có | Có | Có | Lớn hơn |
| `<=` | Có | Có | Có | Có | Có | Nhỏ hơn hoặc bằng |
| `>=` | Có | Có | Có | Có | Có | Lớn hơn hoặc bằng |
| `!=` | Có | Có | Có | Có | Có | Khác |
| Contains Character | Có | Không | Không | Không | Không | Chứa chuỗi |
| Does Not Contain Character | Có | Không | Không | Không | Không | Không chứa chuỗi |
| Begins With Character | Có | Không | Không | Không | Không | Bắt đầu bằng |
| Ends With Character | Có | Không | Không | Không | Không | Kết thúc bằng |
| Range | Có | Có | Có | Có | Có | Trong khoảng; hai giá trị cách nhau bằng dấu phẩy |
| Outside of range | Có | Có | Có | Có | Có | Ngoài khoảng |
| One of | Có | Có | Có | Có | Có | Thuộc một trong các giá trị phân cách bằng dấu phẩy |
| None of | Có | Có | Có | Có | Có | Không thuộc các giá trị |
| Current date- | Không | Không | Có | Không | Có | Từ ngày hiện tại trừ số ngày chỉ định |
| Current month- | Không | Không | Có | Không | Có | Từ ngày hiện tại trừ số tháng chỉ định |
| Null value | Có | Có | Có | Có | Có | Giá trị DB là NULL |
| Not null value | Có | Có | Có | Có | Có | Giá trị DB không phải NULL |

### Ví dụ Range

```text
Item name    : amount
Condition    : Range
Value/formula: 1000,5000
```

### Ví dụ Current date-

```text
Item name    : created_at
Condition    : Current date-
Value/formula: 30
```

Ý nghĩa: lấy dữ liệu từ ngày hiện tại trừ 30 ngày trở đi.

## 27. Kết hợp nhiều Search Condition

WebReport hỗ trợ `AND`, `OR` và phân cấp điều kiện.

### Ví dụ 1

```text
company_code = Code
AND fiscal_year = Year
```

### Ví dụ 2

```text
(company_name Contains Keyword OR department_name Contains Keyword)
AND is_active = 1
```

Trong Designer, click vùng nối giữa các condition để đổi `and`/`or`. Có thể kéo `and` hoặc `or` sang trái để tạo hierarchy. Manual lưu ý thứ tự đánh giá dựa trên hierarchy.

## 28. Ma trận validation có thể làm được

### 28.1 Làm được trực tiếp

| Yêu cầu | Cách làm | Ghi chú |
|---|---|---|
| Bắt buộc nhập | `@ENABLE(3)` | Không cộng 4 |
| Cho phép bỏ trống | `@ENABLE(7)` | Condition trống bị bỏ qua |
| Chỉ cho chọn giá trị cố định | `@SEL`, `@SEL2`, `@CHECKBOX`, `@RADIO` | Cách validation tốt nhất cho enum |
| Chỉ cho chọn giá trị từ DB | `@SELDB`, `@SELDB2`, `@CHECKBOXDB`, `@RADIODB` | Query phụ phải tồn tại |
| Chọn ngày theo format | `@CALENDER` | Hỗ trợ calendar UI |
| Chuyển thành chữ hoa | `@UPPER` | Normalization |
| Chuyển thành chữ thường | `@LOWER` | Normalization |
| Khóa thay đổi operator | `@CONDITION(0)` hoặc `@ENABLE(1/5)` | Tùy việc cho bỏ trống |
| Khóa input | `@ENABLE(0/2/4/6)` | Tùy condition và optional |
| Kiểm tra tương thích kiểu | Kiểu field + condition | Sai kiểu thường sinh lỗi hệ thống |
| Chỉ lấy dữ liệu trong khoảng | `Range` hoặc hai condition `>=`, `<=` | Đây là lọc, không phải cross-field validation |
| Kiểm tra NULL | `Null value`, `Not null value` | NULL khác chuỗi rỗng |

### 28.2 Làm được gián tiếp nhưng không có thông báo validation đẹp

| Yêu cầu | Cách có thể áp dụng | Hạn chế |
|---|---|---|
| Chỉ nhập số | So sánh với field Numeric | Nhập chữ có thể ra lỗi hệ thống, không có message tùy chỉnh |
| Chỉ nhập ngày | So sánh với Date/Datetime và dùng calendar | Gõ tay sai có thể ra lỗi kiểu/DB |
| Min/max numeric | Dùng condition `>=`, `<=`, `Range` | Lọc dữ liệu; không kiểm tra input trước Search |
| Ngày nằm trong phạm vi | Dùng `Range` hoặc From/To | Không tự báo From lớn hơn To |
| Giá trị phải tồn tại trong DB | Dùng `@SELDB` thay text tự do | Không phù hợp khi danh sách quá lớn |
| Không phân biệt hoa thường | `@UPPER`/`@LOWER` và chuẩn hóa phía DB | Phụ thuộc collation/DB/query |

### 28.3 Không thấy manual hỗ trợ trực tiếp trong Search Condition tiêu chuẩn

| Validation mong muốn | Trạng thái |
|---|---|
| Regex, ví dụ `^[0-9]+$` | Không có dedicated function |
| Minimum/maximum text length | Không có dedicated function |
| Chỉ cho nhập ký tự ASCII/kana/email/phone pattern | Không có dedicated function |
| So sánh `From <= To` trước khi chạy | Không có cross-input rule tiêu chuẩn |
| Custom error message tiếng Việt/tiếng Nhật | Không có trong `@INPUT` tiêu chuẩn |
| Hiển thị lỗi ngay dưới input | Không có trong Search Condition tiêu chuẩn |
| JavaScript `onchange`, `onclick`, `onblur` riêng | Không cấu hình bằng `@INPUT` tiêu chuẩn |
| Mask input, ví dụ `9999-99-99` | Không thấy manual hỗ trợ |
| Giới hạn số ký tự ngay khi gõ | Không thấy manual hỗ trợ |

Các trường hợp này cần cân nhắc:

- Đổi text thành pulldown/radio/checkbox.
- Kiểm tra ở DB view, stored function hoặc query.
- Dùng Form Design nếu mục tiêu là form nhập/cập nhật dữ liệu.
- Customization ngoài chức năng report tiêu chuẩn, nếu chính sách sản phẩm cho phép.

## 29. Các mẫu hoàn chỉnh thường dùng

### 29.1 Search form hai dòng, mỗi dòng năm item

```text
Code       : @INPUT(@NAME("Code"),@SELDB("My Report","SampleReports","SearchCodeMaster","name;code"),@SEQ(11),@WIDTH(160),@ENABLE(7),'')
Text       : @INPUT(@NAME("Text"),@SEQ(12),@WIDTH(180),@ENABLE(7),'')
Date       : @INPUT(@NAME("Date"),@CALENDER("YYYY-MM-DD"),@SEQ(13),@WIDTH(100),@ENABLE(7),'')
Active     : @INPUT(@NAME(""),@CHECKBOX("Active;1"),@SEQ(14),@ENABLE(7),'')
Year       : @INPUT(@NAME("Year"),@SEL("2024;2024","2025;2025","2026;2026"),@SEQ(15),@ENABLE(7),'')

From       : @INPUT(@NAME("From"),@CALENDER("YYYY-MM-DD"),@SEQ(21),@WIDTH(100),@ENABLE(7),'')
To         : @INPUT(@NAME("To"),@CALENDER("YYYY-MM-DD"),@SEQ(22),@WIDTH(100),@ENABLE(7),'')
Department : @INPUT(@NAME("Department"),@SELDB("My Report","Master","DepartmentList","department_name;department_code"),@SEQ(23),@ENABLE(7),'')
Status     : @INPUT(@NAME("Status"),@SEL("All;","Open;O","Closed;C"),@SEQ(24),@ENABLE(7),'')
Category   : @INPUT(@NAME("Category"),@SELDB("My Report","Master","CategoryList","category_name;category_code"),@SEQ(25),@ENABLE(7),'')
```

### 29.2 Search bắt buộc Company, các filter khác optional

```text
Company : @INPUT(@NAME("Company"),@SELDB("My Report","Master","CompanyList","company_name;company_code"),@ENABLE(3),'')
Year    : @INPUT(@NAME("Year"),@SEL("2024;2024","2025;2025","2026;2026"),@ENABLE(7),'')
Text    : @INPUT(@NAME("Text"),@GUIDE("Optional"),@ENABLE(7),'')
```

## 30. Lỗi thường gặp và cách xử lý

### 30.1 Checkbox truyền `'true'` vào field Numeric

Lỗi có thể gặp:

```text
The type of the search criterion expression is incorrect: is_active = 'true'
```

Cách sửa:

```text
@CHECKBOX("Active;1")
```

Không dùng:

```text
@CHECKBOX("Active;true")
```

nếu field DB là Integer/Numeric.

### 30.2 Filter trống vẫn tạo biểu thức sai

Nguyên nhân thường gặp:

- Không dùng `@ENABLE(7)` cho filter optional.
- Giá trị rỗng bị đặt trong dấu nháy và so sánh với numeric/date.
- Các input dùng `@SHARE` không có cùng `@ENABLE(7)`.

### 30.3 Pulldown DB không có dữ liệu

Kiểm tra:

1. Query phụ chạy được không.
2. Menu/folder/query name có đúng từng ký tự không.
3. User có quyền chạy query phụ không.
4. Field display/value có đúng tên không.
5. Query có trả quá giới hạn 2000 item không.

### 30.4 Nhập ngày To nhưng thiếu dữ liệu trong ngày cuối

Nếu cột là timestamp:

```text
2026-08-27 15:30:00
```

và To được hiểu thành:

```text
2026-08-27 00:00:00
```

thì điều kiện `<= To` bỏ sót phần còn lại của ngày. Cần thiết kế điều kiện nhỏ hơn ngày kế tiếp hoặc chuẩn hóa timestamp tại DB/query.

### 30.5 Năm nhập chữ gây trang lỗi hệ thống

WebReport có thể phát hiện sai kiểu khi field là Numeric, nhưng message là lỗi hệ thống. Nếu năm chỉ có vài giá trị, thay text bằng:

```text
@SEL("2024;2024","2025;2025","2026;2026")
```

## 31. Quy trình tạo một input trong Designer

1. Mở Definition Setup Wizard.
2. Chọn `Modify an existing query` nếu sửa report hiện có.
3. Chọn menu, folder và query definition.
4. Chọn database và mở Definition Setup.
5. Vào tab `Search condition`.
6. Chọn field tại `Item name`.
7. Chọn toán tử tại `Condition`.
8. Nhập công thức `@INPUT(...)` tại `Value/formula`.
9. Dùng `and`/`or` để nối các điều kiện.
10. Chạy thử bằng Execute.
11. Kiểm tra trường hợp có giá trị, không có giá trị và giá trị sai kiểu.
12. Save definition.
13. Mở report trên trình duyệt và kiểm tra lại layout, paging và export.

## 32. Checklist kiểm thử Search/Validation

- [ ] Không nhập filter nào và Search.
- [ ] Chỉ nhập từng filter một.
- [ ] Nhập đồng thời nhiều filter với `AND`.
- [ ] Kiểm tra nhóm điều kiện `OR`.
- [ ] Nhập chữ vào field Numeric.
- [ ] Nhập ngày không hợp lệ bằng bàn phím.
- [ ] Chọn ngày bằng calendar.
- [ ] Kiểm tra From bằng To.
- [ ] Kiểm tra From lớn hơn To.
- [ ] Kiểm tra To với cột timestamp có dữ liệu cuối ngày.
- [ ] Kiểm tra checkbox được chọn và không được chọn.
- [ ] Kiểm tra pulldown rỗng và từng lựa chọn.
- [ ] Kiểm tra multi-select với một và nhiều giá trị.
- [ ] Kiểm tra user không có quyền chạy query master của `@SELDB`.
- [ ] Kiểm tra layout ở độ phân giải nhỏ.
- [ ] Kiểm tra thứ tự và xuống dòng theo `@SEQ`.
- [ ] Kiểm tra dữ liệu filter khi export XLS nếu dùng `@EXCEL`.

## 33. Kết luận

WebReport Search hỗ trợ đầy đủ các input phổ biến: text, single/multi pulldown, DB pulldown, checkbox, radio, calendar, biến liên kết và shared input. Khả năng validation mạnh nhất là:

- Bắt buộc/optional bằng `@ENABLE`.
- Hạn chế giá trị bằng control lựa chọn.
- Ràng buộc kiểu thông qua field và Search Condition.
- Ràng buộc dữ liệu bằng các operator như `Range`, `One of`, `Null value`.

Search Condition tiêu chuẩn không phải một form-validation framework. Những yêu cầu như regex, độ dài, custom error message hoặc so sánh hai input trước khi Search cần giải pháp ngoài `@INPUT` hoặc phải thay đổi thiết kế control.
