console.log("Bismillah Praktikum Dimulai");

////Aktivitas 1 : DOM SELECTION atau Seleksi Elemen
////Kenapa kita harus seleksi karena = harus menangkap "id" atau "class" nya
////Mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. Mengambil elemen judul utama & sub judul
// document.getelementById("...") mengambil berdasarkan atribut id

const JudulUtama = document.getElementById("judul-utama"); //menangkap: <h1 id = "judul-utama">

// document.querySelector("#....")
// Tanda # artinya ID

const SubJUdul = document.querySelector("#sub-judul"); // menangkap: <p id = "sub-judul">

// 2. Mengambil elemen pada kartu 1 ( kartu manipulasi text dan style)

const TeksPreview = document.getElementById("teks-preview");
const BoxPreview = document.getElementById("box-preview");
const CardManipulasi = document.getElementById("card-manipulasi");

// 3. Mengambil elemen tombol -tombol aksi pada kartu 1

const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const BtnToggleWarna = document.getElementById("btn-toggle-warna");
const BtnReset = document.getElementById("btn-reset");

// 4. Mengambil elemen pada kartu 2 ( fitur catatan dinamis / to do list sederhana)

const InputCatatan = document.getElementById("input-catatan");
const BtnTambah = document.getElementById("btn-tambah");
const DaftarCatatan = document.getElementById("daftar-catatan");
const JumlahCatatan = document.getElementById("jumlah-catatan");
const PesanKosong = document.getElementById("pesan-kosong");

// Aktivitas ke-2 : Manipulasi Teks & Style ( Card 1 )
// addEvenListener("click", function() {...} ) artinya adalah tolong dengarkan dulu/tung 
// sampai di klik user. Jika di klik jalankan perintah didalam function

// A. Mengubah teks & Warna Secara langsung

BtnUbahTeks.addEventListener("click", function() {
    // .innertext = mengganti atau mengisi secara langsung teks yang ada di dalam elemen HTML
    TeksPreview.innerText = "Hebat! Teks ini berhasil diubah pake DOM!";

    // .style.color = untuk mengubah warna teks secara langsung (Inline Style)
    TeksPreview.style.color = "#4138ee";

    // console.log = mencetak pesan di console browser
    console.log("[DOM] Teks Preview telah Diperbaharui!");
});

// B. Mnaipulasi clas CSS menggunakan classList.Tonggle()
BtnToggleWarna.addEventListener("click", function() {
    // classlist.Tonggle("nama-clas") = fitur saklar otomatis (ON/OFF)
    BoxPreview.classList.toggle("active-mode");
    CardManipulasi.classList.toggle("highligt");

    console.log("DOM Berhasil di swicth!");
});


// C. Mengembalikan (reset) teks ke kondisi Semula
BtnReset.addEventListener("click", function() {
 // kembalikan teks semula teks asli
    TeksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript";

// kosongkan warna agar kembali ke CSS
    TeksPreview.style.color = "";

 // hapus class khusus menggunakan classList.remove("")
    BoxPreview.classList.remove("active-mode");
    CardManipulasi.classList.remove("highligt");

    console.log("DOM tampilkan di reset");
});

// Aktivitas 3 & 4 : Elemen DInamis dan Event Handling (to-do list sederhana)
// Di aktivitas ini kita belajar elmen HTML baru (<li>) secara otomatis dalam javascript
// mengisi textnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>)

// Langkah 1 : Membuat variabel penampung angka jumlah catatan
// "let" digunakan untuk nilai variabel yang akan berubah  ubah bisa bertambah bisa berkurang (coounting)
let TotalCatatan = 0;

// Langkah 2 : Fungsi Update angka counter & pesan status
function PerbaharuiJumlah() {
    // Masukkan angka total terbaru ke dalam tag < span id = "jumlah-catatan">
    JumlahCatatan.innerText = TotalCatatan;

    // Conditional Statment berupa apakah catatan itu kosong/ 0?
    if (TotalCatatan === 0) {
        // jika 0 : hapus class "hidden" supaya teks "belum ada catatan " muncul di layar
        PesanKosong.classList.remove("hidden");
    } else {
        // jika > 0: tambahkan class "hiudden" agara teks "belum ada catatan tersembunyi"
        PesanKosong.classList.add("hidden");
    }
}

// Langkah 3 : Fungsi utama logika tambah catatan baru
function TambahCatatan() {
    // 3.1 inputCatatan.value fungsi nya untuk mengambil teka yang diketik oleh user
    // .trim() = menghapus spasi diawal dan diakhir
    const IsiTeks = InputCatatan.value.trim();

    // 3.2 Validasi Input: Jika isi teks kosong maka tampilkan alert
    if (IsiTeks === "") {
        alert("Catatan kamu tidak boleh kosongg!");
        return;
    }

    // 3.3 document.createElement("li") -> membuat memori di javascript secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // menambahkan pada tag li

    // 3.4 .innerHTML = mengisi struktur didalam <li> dengan teks catatan dan tombol hapus
    // tanda backtick(`)
    liBaru.innerHTML = `<span>${IsiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 Menambahkan telinga/Event Listener untuk Tombol hapus pada catatan dinamis
    // liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const BtnHapus = liBaru.querySelector(".btn-hapus");
    BtnHapus.addEventListener("click", function() {
        liBaru.remove(); ///untuk menghapus elemen list dari layar html
        TotalCatatan--; ///total catatan dikuarangi 1x
        PerbaharuiJumlah(); /// panggil fungsi perbaharuilah untuk update angka dilayar
        console.log(`DOM Catatan "${IsiTeks}" dihapus.`);
    });

    // 3.6 appendchild = memasukkan elemen li kedalam wadah <ul id="daftar-catatan">
    DaftarCatatan.appendChild(liBaru);

    // 3.7 Mengososngkan kembali isis kolom input (inputcatatan.value = "") supaya bisa diketiklagi
    InputCatatan.value = "";

    // 3.8 TotalCatatan ++ artinya tambah nilai total catatan sebanyak 1, lalu update angka ke layar
    TotalCatatan++;
    PerbaharuiJumlah();

    console.log(`DOM Catatan baru ditambahkan: ${IsiTeks} `);
}

// Langkah 4 : Event Listener klik tombol + "tambah"
// kertika tombol + tambah di klik oleh user , maka jalankan fungsi tambah catatan()
BtnTambah.addEventListener("click", function() {
    TambahCatatan();
});

// Langkah 5 : Event Listener Keyboard "Enter" pada kolom input
// Ketika user menegtik di kolom input dan melepas tombol keyboard('Event keyup);
InputCatatan.addEventListener("keyup", function(event) {
    // periksa apakah tombol keyboard yang ditekan user adalah enter?
    if(event.key === "Enter") {
        TambahCatatan(); // jika ya, jalankan fungsi tambah catatan()
    }
});