DEUTSCHMEISTER ANDROID - HUONG DAN TAO APK BANG DIEN THOAI

Muc tieu: GitHub Actions tu dong bien ma nguon React/Vite thanh file APK Android.
Ban ZIP nay chua phai APK; APK se duoc tao sau khi GitHub Actions build thanh cong.

PHAN A - TAI DU AN LEN GITHUB
1. Tai ZIP va giai nen tren dien thoai (Files / Tep cua ban).
2. Mo https://github.com va dang nhap.
3. Tao repository moi, dat ten deutschmeister-android.
4. Chon Add file > Upload files.
5. Vao thu muc deutschmeister-android vua giai nen, chon TOAN BO noi dung ben trong (bao gom thu muc .github; neu app Files khong hien file an, can dam bao thu muc .github/workflows/build-android.yml duoc tai len).
6. Commit changes len nhanh main.

PHAN B - CHO BUILD APK
1. Trong repository GitHub, mo tab Actions.
2. Chon workflow 'Build DeutschMeister Android APK'.
3. Neu chua tu chay, bam Run workflow > Run workflow.
4. Cho den khi workflow hien dau xanh (Success).
5. Mo lan chay thanh cong, keo xuong muc Artifacts va bam DeutschMeister-Android-APK de tai ZIP artifact.

PHAN C - CAI TREN ANDROID
1. Mo ZIP artifact vua tai, chon giai nen.
2. Tim file app-debug.apk.
3. Cham vao file APK > Install.
4. Neu Android hoi, cho phep Chrome/Files cai ung dung tu nguon nay trong Settings, sau do quay lai cai dat.
5. Mo DeutschMeister tu man hinh ung dung.

LUU Y
- Can Internet va tai khoan GitHub. GitHub Actions se build tren may chu, khong can cai Android Studio/Node tren dien thoai.
- APK debug dung de cai thu va su dung ca nhan; chua phai ban phat hanh Play Store.
- AI chat trong ma nguon goc chua co Gemini API key; khong dua API key bi mat truc tiep vao ung dung Android. Muon dung AI can tao backend an toan.
- Neu build that bai, mo workflow log va gui anh loi de sua.
