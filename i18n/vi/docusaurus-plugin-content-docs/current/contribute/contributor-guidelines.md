---
id: contributor-guidelines
title: Cách đóng góp
sidebar_label: Contributor guidelines
description: Chuẩn bị cho những đóng góp sắp tới của bạn
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
Cảm thấy tự do [đưa ra một vấn đề trên kho lưu trữ Polygon Wiki của chúng ta](https://github.com/maticnetwork/matic-docs/issues)
:::

## Nhận dạng một khu vực có thể đóng góp {#identify-an-area-to-contribute-to}


Có một số cách để xác định một khu vực mà bạn có thể đóng góp cho Wiki:

- Cách dễ nhất là liên hệ với một trong [những người duy trì Wiki](/docs/contribute/community-maintainers) và
nói "Tôi muốn đóng góp cho Polygon Wiki".
Họ sẽ làm việc với bạn để tìm
một lĩnh vực bạn có thể đóng góp.
-
Nếu bạn có một đóng góp cụ thể nhưng không chắc chắn về nó, hãy xác nhận xem
đóng góp đó có phù hợp không bằng cách liên hệ trực tiếp với một trong[ những người duy trì Wiki.](/docs/contribute/community-maintainers)
-
Nếu bạn không có ý kiến ​​đóng góp cụ thể, bạn cũng có thể duyệt qua các vấn đề được gắn nhãn như `help wanted`trên [đại diện Polygon GitHub](https://github.com/maticnetwork).
-
Các vấn đề có `good first issue`gắn thêm nhãn được coi là lý tưởng cho những người mới tham gia.

## Thêm vào tài liệu Polygon {#add-to-the-polygon-documentation}

  -
  Nếu bạn cần thêm hoặc thay đổi bất kỳ điều gì trong Polygon Wiki, vui lòng đưa ra yêu cầu (PR)
  đối với `master`nhánh (vui lòng kiểm tra mẫu yêu cầu).
  - Đội ngũ tài liệu sẽ xem xét yêu cầu (PR) hoặc liên hệ trong trường hợp phù hợp.
  - Kho lưu trữ: https://github.com/maticnetwork/matic-docs
  - Mẫu PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Nếu bạn muốn chạy localy Wiki của chúng tôi trên máy của bạn, hãy kiểm tra phần đang [chạy localy Wiki.](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) Nếu bạn đang thêm tài liệu mới, bạn sẽ được khuyến nghị chỉ cần có một số thông tin cơ bản/giới thiệu và một liên kết với Github hoặc tài liệu của bạn để biết thêm chi tiết.
:::

## Quy tắc Git {#git-rules}


Chúng tôi sử `gitchangelog`dụng cho tất cả các kho lưu trữ của mình để ghi nhật ký thay đổi.
Vì vậy, chúng tôi cần
tuân thủ quy ước sau cho thông báo cam kết. Sẽ không có việc kết hợp nếu bạn đang không tuân theo quy tắc này.

### Quy ước thông báo cam kết {#commit-message-convention}

Sau đây là những gợi ý về những gì có thể hữu ích để suy nghĩ về việc thêm vào các tin nhắn cam kết. Bạn có thể muốn tách các cam kết của mình thành các phần lớn:

- theo ý định (ví dụ: mới, sửa chữa, thay đổi ...)
- theo đối tượng (ví dụ: tài liệu, bao bì, mã ...)
- theo đối tượng (ví dụ: nhà phát triển, người kiểm thử, người dùng ...)

Ngoài ra, bạn có thể muốn gắn thẻ cho một số cam kết:

- Theo cam kết "quy tắc nhỏ" không thể cập nhật vào các nhật ký thay đổi của bạn (các thay đổi về hình thức,
lỗi đánh máy nhỏ trong nhận xét ...).
-
Là "người tái cấu trúc" nếu bạn không thực sự có bất kỳ thay đổi tính năng đáng kể nào.
Vì vậy, điều này cũng không nên là một phần của nhật ký thay đổi được hiển thị cho người dùng cuối cùng, nhưng
có thể được một số người quan tâm nếu bạn có nhật ký thay đổi dành cho nhà phát triển.
- Bạn cũng có thể gắn thẻ bằng “api” để đánh dấu các thay đổi API hoặc nếu đó là một API mới hoặc tương tự.


Hãy thử viết tin nhắn cam kết của bạn với mục tiêu tiệm cận gần chức năng của người dùng thường xuyên.

:::note Ví dụ

Đây là nhật ký git tiêu chuẩn `--oneline`để hiển thị cách những thông tin này có thể được lưu trữ:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::


Để biết thêm thông tin, vui lòng tham khảo [
Một số cách tốt để quản lý một Nhật ký thay đổi bằng Git là gì ?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890).


Để biết thêm thông tin chi tiết, truy cập [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
