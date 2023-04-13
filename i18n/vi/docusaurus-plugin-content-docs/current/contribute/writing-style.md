---
id: writing-style
title: Nguyên tắc Viết Chung
sidebar_label: General writing guidelines
description: Tuân thủ các hướng dẫn sau đây khi viết.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: writing-style
---


Hướng dẫn này tập trung vào các phương pháp hay nhất để viết tài liệu kỹ thuật và về các quy ước về phong cách để sử dụng khi phát triển tài liệu cho Polygon Wiki.
Mục tiêu của hướng dẫn này là giúp những người đóng góp viết nội dung rõ ràng, ngắn gọn,
và nhất quán.
Đội ngũ Polygon coi Polygon Wiki như một sản phẩm Tài liệu chính thức.

## Hướng dẫn chính {#primary-guidelines}

Chúng tôi tin rằng một trong những điều khiến Polygon trở nên đặc biệt là thiết kế mạch lạc của nó và chúng tôi tìm cách duy trì đặc điểm định vị này. Đội ngũ Polygon xử lý Polygon Wiki như một sản phẩm Tài liệu chính thức. Ngay từ đầu, chúng tôi đã xác định một số nguyên tắc để đảm bảo
những đóng góp mới chỉ nâng cao tổng thể dự án:

- **Chất lượng**: Mã trong dự án Polygon phải đáp ứng các nguyên tắc về phong cách, với đủ trường hợp thử nghiệm, thông điệp cam kết mô tả, bằng chứng cho thấy đóng góp không phá vỡ bất kỳ cam kết tương thích nào hoặc gây ra các tương tác bất lợi cho tính năng,
và bằng chứng về đánh giá ngang hàng chất lượng cao.
- **Quy mô**: Văn hóa của dự án Polygon là một trong những PR nhỏ, được gửi thường xuyên. Yêu cầu (PR) càng lớn, bạn càng có nhiều khả năng được yêu cầu
gửi lại dưới dạng một loạt các yêu cầu (PR) nhỏ hơn khép kín và có thể xem xét riêng lẻ.
- **Khả năng bảo trì**: Nếu tính năng yêu cầu bảo trì liên tục (ví dụ: hỗ trợ cho một nhan hiệu cụ thể của cơ sở dữ liệu), chúng tôi có thể yêu cầu bạn nhận trách nhiệm duy trì đặc điểm này.

Hướng dẫn về phong cách lấy động lực từ các sổ tay hướng dẫn về phong cách sau:

> Nếu bạn không thể tìm thấy câu trả lời cho câu hỏi về phong cách, ngữ điệu hoặc câu hỏi thuật ngữ
> trong hướng dẫn này, vui lòng tham khảo các nguồn này.

- [
Hướng dẫn phong cách của Google](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [Sách hướng dẫn về phong cách của Oxford](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [Phong cách của Microsoft](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Công cụ tạo các trang web tĩnh {#static-site-generator}


Wiki được xây dựng bằng [Docusaurus](https://docusaurus.io/), công cụ tạo trang web tĩnh để xây dựng các trang web tài liệu trong markdown.
Wiki tuân thủ siêu dữ liệu sau mẫu cho các tệp đánh dấu của nó và phải được bổ sung cho mỗi tài liệu mới:

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

Có một số khía cạnh quan trọng cần xem xét khi viết siêu dữ liệu cho tệp tin đánh dấu:
- Chúng tôi yêu cầu những người đóng góp sử dụng một **id duy nhất**; tránh **chỉ** sử dụng các từ hoặc câu chung chung như "Giới thiệu" hoặc "Tổng quan".
- **Tiêu đề** là câu được sử dụng ở đầu bài viết, "Nguyên tắc Viết Chung" cho bài viết này. Vì vậy, không nhất thiết phải thêm tiêu đề H1/H2 để giới thiệu mỗi bài viết. Thay vào đó, hãy sử dụng **tiêu đề** này từ siêu dữ liệu.
- **Phần mô tả** không được quá dài vì nó được sử dụng trên các ô chỉ số có giới hạn về số lượng ký tự. Ví dụ: mô tả "Blockchain là một sổ cái bất biến để ghi lại các giao dịch" cho *basics-blockchain.md* xuất hiện trên một ô chỉ số như sau: ![img](/img/contribute/index-tile.png)


Sau đó,** mô tả** phải có** tối đa 60 ký tự**, tính luôn khoảng cách giữa các ký tự.
- Từ khóa rất quan trọng để tăng SEO và mô tả bài viết.
Cố gắng hướng đến ít nhất năm từ khóa.

:::note

Vui lòng xem [tài liệu siêu dữ liệu chính thức](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) để biết thêm thông tin chi tiết.

:::

### Chia sẻ kinh nghiệm với người đọc {#share-the-experience-with-the-reader}

- Ngôi thứ nhất: Không sử dụng "tôi".
Hạn chế sử dụng quan điểm của ngôi thứ nhất và có chủ đích.
Khi được sử dụng quá mức, ngôi kể thứ nhất có thể lấn át cảm giác của một trải nghiệm chia sẻ và che mờ hành trình của người đọc.
- Ngôi thứ hai: Trong hầu hết các trường hợp, hãy nói chuyện trực tiếp với người đọc. Đối với các hướng dẫn, hãy sử dụng một trong hai ngôi thứ nhất số nhiều — chúng tôi, của chúng tôi— hoặc quan điểm của ngôi thứ hai. Vì hướng dẫn cung cấp một cách tiếp cận chủ đề có hướng dẫn hơn, sử dụng ngôi thứ nhất số nhiều sẽ tự nhiên hơn và thực tiễn được chấp nhận phổ biến hơn so với các loại tài liệu khác.
- Ngôi thứ ba: Không sử dụng “chúng tôi” để chỉ Polygon hoặc Công nghệ Polygon.
- Ngữ điệu chủ động: Sử dụng thì hiện tại bất cứ khi nào có thể. Có những tình huống mà ngữ điệu bị động  sẽ thích hợp; chuyển sang giọng bị động khi tác nhân cần trở thành tâm điểm.
- Lưu ý đến sự hiện diện của con người: giữ giọng điệu năng động khi mô tả các khái niệm kỹ thuật
sẽ thực sự giúp người đọc kết nối với tài liệu thay vì mô tả phần mềm (hoặc mã) chỉ vì tính năng của chúng.
- Đại từ: sử dụng đại từ trung tính về giới tính, như “họ” bất cứ khi nào có thể.
Nhìn chung, bạn có thể
thay đổi bất kỳ danh từ nào từ số ít sang số nhiều để có sự thống nhất về chủ ngữ-động từ-đại từ và tránh sử dụng các đại từ chỉ giới tính như “anh ấy”, “anh ta”, “của anh ấy” hoặc “cô ấy”, “cô ta”, “của cô ấy”.
  - Hãy cảnh giác với những đại từ mạo danh và có khả năng không rõ ràng.
  Nếu bạn sử dụng bất kỳ đại từ nào sau đây đại từ nhân xưng, hãy chắc chắn rằng bạn trả lời "cái gì?", "cái nào?", hoặc "cái gì?" trong câu.
    -
    tất cả, khác, bất kỳ
    - mỗi lần, cái này hay cái kia
    -
    một ít, nhiều, không,
    -
    một, khác
    - giống nhau, một số, một vài, như vậy
    - cái đó, họ, cái này, cái kia

### Hãy sắc nét và ngắn gọn {#being-swift-and-concise}

- Tài liệu có nội dung mạnh mẽ và đầy đủ ý nghĩa khi sử dụng các từ cần thiết và đúng cụm từ.
  - Sử dụng những từ thông dụng, phổ biến bất cứ khi nào có thể.
  -
  Tránh ngôn ngữ hoa mỹ và các cụm từ văn học quá mức.
  - Tránh biệt ngữ, từ thông tục và cụm từ thành ngữ.
  - Tránh các trạng từ và câu chủ quan. Ví dụ: không sử dụng các từ và cụm từ bao gồm dễ dàng, liên tục, đơn giản, nhanh chóng, Nếu cần, tốt hơn hết là nên nói giảm hơn là nói quá.
  - Không sử dụng các cụm từ giới thiệu mơ hồ. Ví dụ: thay vì "Khi bản phát hành này được phát hành trực tiếp..." sử dụng "Sau khi bản phát hành này được phát hành trực tiếp...".
  - Chú ý thêm với sự lựa chọn từ ngữ.
  Chọn sử dụng “kể từ khi” (ngụ ý một khoảng thời gian) thay vì “bởi vì” (ngụ ý nguyên nhân và kết quả) hoặc sử dụng “một lần” (một lần xuất hiện) thay vì “sau khi” (mỗi lần).
  - Tránh dấu chấm than.
- Tránh thêm các từ hoặc cụm từ không cần thiết. Vài ví dụ:
  -
  Thay vì nói "và sau đó", chỉ cần sử dụng "sau đó".
  - Thay vì nói "Để cho", chỉ cần sử dụng "để".
  - Thay vì nói “cũng như”, chỉ cần sử dụng “và”.
  - Thay vì nói “qua”, hãy sử dụng một từ thay thế tiếng Anh thích hợp như “bằng cách sử dụng”, “thông qua” hoặc “bằng”.
-
Sử dụng ngữ điệu trò chuyện không quá trang trọng nhưng vẫn phải chuyên nghiệp.
- Sự rõ ràng: mang lại sức sống cho từ hoặc cụm từ nếu có thể. Ví dụ:
  -
  Thay vì nói “vd”, hãy sử dụng “ví dụ”.
  -
  Thay vì nói "tức là", hãy sử dụng "đó là" hoặc viết lại câu để làm rõ nghĩa mà không cần thêm sự chuyên nghiệp hơn.
  - Thay vì nói “v.v.”, hãy sử dụng “thêm nữa” hoặc sửa đổi nội dung để làm cho cụm từ này không cần thiết nữa. Thay vì
  “v.v.” để kết thúc danh sách các ví dụ, hãy tập trung vào một hoặc hai ví dụ và sử dụng "chẳng hạn như" hoặc "như".
  - Thay vì “báo trước”, hãy sử dụng từ thay thế tiếng Anh thích hợp như “thông báo”, “cẩn trọng” hoặc “cảnh báo”.
  - Sự rút gọn cung cấp cho tài liệu ngữ điệu trò chuyện tự nhiên hơn—ít nhất là đối với người nói tiếng Anh.
  Nhận biết khi nào và tại sao bạn sử dụng các biện pháp rút ngắn văn bản.

## Cấu trúc {#structure}

Các tài liệu nên được sắp xếp theo từng phần. Mỗi phần phải chịu trách nhiệm về việc
trình bày một đề tài hoặc chủ đề. Trong mỗi phần, một hoặc nhiều đoạn văn sẽ tồn tại.
Mỗi đoạn văn chỉ nên truyền đạt một ý tưởng.
Cố gắng tránh lặp lại những ý tưởng giống nhau
trong các phần khác nhau và phân chia những đoạn văn có nhiều điểm để thảo luận. Người đọc nên hiểu nội dung của một đoạn văn từ câu đầu tiên của nó.

## Tài liệu sản phẩm {#product-documentation}

Nếu bạn đang viết về một sản phẩm cụ thể, hãy đảm bảo tài liệu đó giống với sản phẩm. Trước đây, tài liệu Polygon được khái quát hóa, dựa trên Polygon PoS. Giờ đây, có nhiều sản phẩm dựa trên Polygon, những người đóng góp cần phải lưu ý khi bổ sung nội dung.

Ví dụ: "Triển khai hợp đồng thông minh trên Polygon bằng ####" là không rõ ràng. Nếu hướng dẫn này
đã đề cập đến Polygon PoS, nó phải rõ ràng, như trong, "Triển khai hợp đồng thông minh trên Polygon PoS sử dụng ####".
Sử dụng cùng một ví dụ với Polygon Rollup, như Polygon Hermez, "Triển khai hợp đồng thông minh trên Polygon Hermez bằng cách sử dụng ####".


Đảm bảo rằng sản phẩm tài liệu, cho dù là quy định chung hay hướng dẫn, được bổ sung đúng vào Trung tâm sản phẩm tài liệu phù hợp. Đối với hầu hết các tài liệu, tham chiếu của chúng phải tồn tại dưới một trong các Trung tâm chung (ví dụ: "Phát triển" hoặc "Xác thực"), nhưng tài liệu thực tế sẽ nằm trong sản phẩm tài liệu của nó. Bạn sẽ cần tham khảo tài liệu trong Trung tâm bằng cách
thêm nó vào`sidebars.js`. Tuy nhiên, bản thân tài liệu thực tế sẽ tồn tại trong Trung tâm sản phẩm tài liệu tương ứng của nó, và nó sẽ chuyển hướng người dùng khi họ nhấp vào nó. Quy định tương tự áp dụng cho hầu hết tài liệu.
Tham chiếu của họ phải tồn tại dưới một trong các Trung tâm chung, nhưng tài liệu thực tế sẽ nằm trong sản phẩm tài liệu của nó.

Hầu hết các tài liệu dựa trên API trên Polygon Wiki đều ở dạng tài liệu tham khảo, ngoại trừ các API được đề cập trong hướng dẫn.
Ví dụ: tài liệu API trên Matic.js cung cấp thông tin về kết cấu, tham số và giá trị trả về cho từng hàm hoặc phương thức trong API.

## tài liệu API {#api-documentation}

Hãy xem xét những điều sau khi ghi lại một API:

* Phần giới thiệu chắc chắn cung cấp một điểm khởi đầu.
* Mô tả rõ ràng về cuộc gọi hoặc yêu cầu.
Mô tả những gì điểm cuối làm.
* Danh sách tham số đầy đủ:
  * Các loại tham số
  * Biểu thức cú pháp với bộ giữ chỗ hiển thị các tham số có sẵn
  *
  Định dạng đặc biệt
* Ví dụ về mã cho nhiều ngôn ngữ.
* Cuộc gọi mẫu với kết quả dự kiến.
*
Mã lỗi. Các trường hợp cạnh.
* Hướng dẫn cách lấy khóa API, trong trường hợp cần thiết.
* Lưu ý các câu hỏi thường gặp hoặc các tình huống luôn hữu ích.
* Liên kết đến các nguồn sung như bài đăng trên mạng xã hội, blog hoặc nội dung video.
