import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import { donVidata } from "../../kiemTraQuyIII/danhMuc/dinhMuc/dinhMucData";

const apiService = {
  getDonVi: async (year) => {
    try {
      const url = new URL(
        `${import.meta.env.VITE_API_URL}kiem-tra-quy-iii/don-vi`
      );
      url.searchParams.append("year", year);
      const response = await axios.get(url.toString());
      return response.data;
    } catch (error) {
      return null;
    }
  },
  getLo: async (nam, donVi) => {
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}kiem-tra-quy-iii/lo`);
      url.searchParams.append("donVi", donVi);
      url.searchParams.append("year", nam);
      const response = await axios.get(url.toString());
      return response.data;
    } catch (error) {
      return null;
    }
  },

  getDataPhieuKiemTra: async (nam, donVi, lo) => {
    try {
      const url = new URL(
        `${import.meta.env.VITE_API_URL}kiem-tra-quy-iii/phieu`
      );
      url.searchParams.append("donVi", donVi);
      url.searchParams.append("year", nam);
      url.searchParams.append("lo", lo);
      const response = await axios.get(url.toString());
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

const PhieuDaNgoai = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [nam, setNam] = useState("");
  const [maDonVi, setMaDonVi] = useState([]);
  const [rows, setRows] = useState([]);
  const [lo, setLo] = useState([]);
  const [donViSelect, setDonViSelect] = useState(null);
  const [namSelect, setNamSelect] = useState(null);
  const [loSelect, setLoSelect] = useState(null);
  const [data, setData] = useState(null);

  const [YEARS, setYEARS] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from(
      { length: currentYear - 2024 + 1 },
      (_, i) => 2024 + i
    );
    setYEARS(yearsArray);
  }, []);

  const handleChangeYear = async (year) => {
    const result = await apiService.getDonVi(year);
    setMaDonVi(result.data);
  };

  const handleChangeDonVi = async (nongTruong) => {
    const result = await apiService.getLo(namSelect, nongTruong);
    setLo(result.data);
  };

  const loadKQKT = async () => {
    setLoading(true);
    const result = await apiService.getDataPhieuKiemTra(
      namSelect,
      donViSelect,
      loSelect
    );
    setData(result.data);
    const rows = chunkArray(result.data.detail, 5, result.data);
    setRows(rows);
    setLoading(false);
  };

  const chunkArray = (arr, size, data) => {
    const result = [];
    let temp = 50;

    // chú ý: so sánh phải dùng === chứ không phải =
    if (data.giongCay === "RRIV 124" && data.namKT === "2024") {
      temp = 52;
    }

    for (let i = 0; i < arr.length; i += size) {
      const group = arr.slice(i, i + size);

      // thống kê
      let HoTrong = 0;
      let CaoT50 = 0;
      let CaoD50 = 0;
      let ChuaCaoT50 = 0;
      let ChuaCaoD50 = 0;
      let CutDot = 0;
      let C1 = 0;
      let C2 = 0;

      group.forEach((item) => {
        if (item.hoTrong == 1) {
          HoTrong++;
        } else if (item.cayCao >= temp) {
          CaoT50++;
        } else if (item.cayCao < temp) {
          CaoD50++;
        } else if (item.cayChuaCao >= temp) {
          ChuaCaoT50++;
        } else {
          ChuaCaoD50++;
        }
        if (item.namHong == "cụt đọt") {
          CutDot++;
        } else if (item.namHong == "C2+") {
          C2++;
        } else if (item.namHong == "C, C1") {
          C1++;
        }
      });

      result.push({
        data: group, // dữ liệu gốc
        HoTrong, // số hố trống
        CaoT50, // cây >= ngưỡng
        CaoD50, // cây < ngưỡng
        ChuaCaoT50, // cây chưa cạo >= ngưỡng
        ChuaCaoD50, // cây chưa cạo < ngưỡng
        CutDot,
        C1,
        C2,
      });
    }

    return result;
  };

  // 👉 hàm tính tổng
  const calculateTotals = (rows) => {
    return rows.reduce(
      (acc, row) => {
        acc.HoTrong += Number(row.HoTrong || 0);
        acc.CaoT50 += Number(row.CaoT50 || 0);
        acc.CaoD50 += Number(row.CaoD50 || 0);
        acc.ChuaCaoT50 += Number(row.ChuaCaoT50 || 0);
        acc.ChuaCaoD50 += Number(row.ChuaCaoD50 || 0);
        acc.CutDot += Number(row.CutDot || 0);
        acc.C1 += Number(row.C1 || 0);
        acc.C2 += Number(row.C2 || 0);
        return acc;
      },
      {
        HoTrong: 0,
        CaoT50: 0,
        CaoD50: 0,
        ChuaCaoT50: 0,
        ChuaCaoD50: 0,
        CutDot: 0,
        C1: 0,
        C2: 0,
      }
    );
  };

  const totals = calculateTotals(rows);

  const printTable = () => {
    if (!data) {
      alert("Chưa có dữ liệu để in. Hãy bấm Tìm kiếm trước.");
      return;
    }

    const printWindow = window.open("", "_blank");
    const tableElement = document.getElementById("bangNhap");

    if (!tableElement) {
      alert("Không tìm thấy bảng dữ liệu!");
      return;
    }

    const htmlEscape = (s) =>
      (s ?? "")
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Clone the table to avoid modifying the original
    const tableClone = tableElement.cloneNode(true);

    // Lấy thông tin cần hiển thị
    const _donVi = donViSelect ? donViSelect.toUpperCase() : "";
    const _nam = namSelect ? ` ${htmlEscape(namSelect)}` : "";
    const _lo = data?.loKiemTra ? htmlEscape(data.loKiemTra) : "";
    const _ngayKiemTra = data?.ngayKiemTra
      ? new Date(data.ngayKiemTra).toLocaleDateString("vi-VN")
      : new Date().toLocaleDateString("vi-VN");

    const _iconDownRight =
      data?.huong === 1 ? `<i class="bi bi-arrow-down-right"></i>` : "";

    const _iconDownLeft =
      data?.huong === 2 ? `<i class="bi bi-arrow-down-left"></i>` : "";

    const _iconUpRight =
      data?.huong === 3 ? `<i class="bi bi-arrow-up-right"></i>` : "";

    const _iconUpLeft =
      data?.huong === 4 ? `<i class="bi bi-arrow-up-left" class></i>` : "";

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>

        <title>Phiếu dã ngoại mở cạo</title>
        <style>
          body {
            font-family: "Times New Roman", Times, serif;
            margin: 2px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 20px;
          }
          th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
            width: 100px;
          }
          .table-active {
            font-weight: bold;
            background-color: #f1f1f1;
          }
          .text-wrap {
            white-space: normal !important;
          }
         
          @media print {
            body { 
            margin: 0 60px; 
            zoom: 0.67;   /* thu nhỏ 67% */
            transform-origin: top left; /* neo góc trái trên, tránh lệch trang */
            }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }



            @page {
              
              size: A4 portrait; /* hoặc landscape nếu bạn cần ngang */
              margin: 50px 0;         /* để không bị cắt khi scale */
            }
          }
        </style>
      </head>
      <body>
      <div id="page-box"></div>

      <div id="content-wrapper">
          <div id="header-block">
              <p><b>TỔNG CÔNG TY CAO SU ĐỒNG NAI</b></p>
              <p><b>Đội:</b> ${htmlEscape(_donVi)}
                
              </p>
              <p><b>Ngày kiểm tra: </b> ${htmlEscape(_ngayKiemTra)}</p>
          </div>

          <h4 style="text-align: center; margin-bottom: 20px; font-weight: 600">
            PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY MỞ CẠO NĂM ${_nam}
          </h4>

          <div id="table-block">
            ${tableClone.outerHTML}
          </div>

            <div id="legend-block" style="display: grid; grid-template-columns: auto auto auto; justify-content:  center; margin-top: 10px">

              <p style="text-align: center; display: flex; align-items: center; justify-content: center;">
              ${_iconDownRight}
              </p>

              <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin-bottom: 0">${
                data?.truoc
              }</p>

              <p style="text-align: center; display: flex; align-items: center; justify-content: center;">
              ${_iconDownLeft}</p>

              <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin: 0">${
                data?.trai
              }</p>

              <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin: 0; font-weight: 600">${_lo}</p>

              <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin: 0">
              ${data?.phai}</p>

              <p style="text-align: center; margin: 0; display: flex; align-items: center; justify-content: center;">
              ${_iconUpRight}</p>

              <p style="border: 1px solid #000; padding: 10px 30px; text-align: center; margin: 0">${
                data?.sau
              }</p>

              <p style="text-align: center; margin: 0; display: flex; align-items: center; justify-content: center;">
              ${_iconUpLeft}</p>
          </div>

          <div id="sign-block" style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 10px">
            <p style="text-align: right; margin-top: 10px; font-weight: bold; font-size: 20px">
              ĐẠI DIỆN ĐỘI
            </p>
            <p style="text-align: right; margin-top: 10px; font-weight: bold; font-size: 20px">
              NGƯỜI KIỂM TRA
            </p>
          </div>
      </div>
        
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load before printing
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <Fragment>
      {/* <Pageheader title="Phiếu Dã Ngoại" heading="Tables" active="Tables" /> */}
      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY MỞ CẠO</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn năm"
                    value={namSelect}
                    onChange={(e) => {
                      setNamSelect(e.target.value);
                      handleChangeYear(e.target.value);
                    }}>
                    <option value="">Chọn năm</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn đơn vị"
                    value={donViSelect}
                    disabled={!namSelect}
                    onChange={(e) => {
                      setDonViSelect(e.target.value);
                      handleChangeDonVi(e.target.value);
                    }}>
                    <option value="">Chọn đơn vị</option>
                    {maDonVi.map((dv, key) => (
                      <option key={key} value={dv.nongTruong}>
                        {dv.nongTruong}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn lô"
                    value={loSelect}
                    onChange={(e) => setLoSelect(e.target.value)}
                    disabled={!namSelect || !donViSelect}>
                    <option value="">Chọn lô</option>
                    {lo.map((lo, index) => (
                      <option key={index} value={lo.tenLo}>
                        {lo.tenLo}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Button
                    className="btn btn-primary label-btn"
                    onClick={() => loadKQKT()}>
                    <i className="bi bi-search label-btn-icon me-2"></i>
                    {loading ? "Đang tải..." : "Tìm kiếm"}
                  </Button>
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                  <Button
                    className="btn btn-success label-btn ms-5"
                    onClick={printTable}>
                    <i className="bi bi-printer label-btn-icon me-2"></i>
                    In phiếu
                  </Button>
                </Col>
              </Row>
              {data && (
                <>
                  {/* <Row className="mt-5">
                    <Col xl={3}>
                      <p>
                        <b>TỔNG CÔNG TY CAO SU ĐỒNG NAI</b>
                      </p>
                      <p>
                        <b>Đội:</b>{" "}
                        {data.nongTruong}
                      </p>
                      <p>
                        <b>Ngày kiểm tra:</b>{" "}
                        {new Date(data.ngayKiemTra).toLocaleDateString("vi-VN")}
                      </p>
                    </Col>
                  </Row> */}

                  <div className="d-flex justify-content-center">
                    <h4>
                      PHIẾU KIỂM TRA DÃ NGOẠI VƯỜN CÂY MỞ CẠO
                      {nam && <> NĂM {nam}</>}
                    </h4>
                  </div>

                  <div className="table-responsive mt-4">
                    <Table className="table text-nowrap" id="bangNhap">
                      <thead className="sticky-header ">
                        <tr className="">
                          <th
                            className="text-wrap border border-dark"
                            rowSpan={5}>
                            Hàng
                          </th>
                          <th
                            className="text-center border border-dark"
                            colSpan={8}>
                            Lô:{" "}
                            <span style={{ textDecoration: "underline" }}>
                              {data.loKiemTra}
                            </span>{" "}
                            - Năm trồng:{" "}
                            <span style={{ textDecoration: "underline" }}>
                              {data.namTrong}
                            </span>{" "}
                            - Giống:{" "}
                            <span style={{ textDecoration: "underline" }}>
                              {data.giongCay}
                            </span>
                          </th>
                        </tr>

                        <tr>
                          <th
                            className="text-center border border-dark"
                            colSpan={8}>
                            Tọa độ cây thứ I: Hàng:{" "}
                            <span style={{ textDecoration: "underline" }}>
                              {data.hang}
                            </span>{" "}
                            Cây:{" "}
                            <span style={{ textDecoration: "underline" }}>
                              {data.cay}
                            </span>
                          </th>
                        </tr>
                        <tr>
                          <th
                            className="text-center border border-dark col-HT"
                            rowSpan={3}>
                            Hố trống
                          </th>
                          <th
                            className="text-center border border-dark"
                            colSpan={4}>
                            Vanh
                          </th>
                          <th
                            className="text-center border border-dark"
                            colSpan={3}>
                            Nấm hồng
                          </th>
                        </tr>
                        <tr>
                          <th
                            className="text-center border border-dark"
                            colSpan={2}>
                            Cây cạo
                          </th>
                          <th
                            className="text-center border border-dark"
                            colSpan={2}>
                            Cây chưa cạo
                          </th>
                          <th
                            className="text-center border border-dark"
                            rowSpan={2}>
                            C, C1
                          </th>
                          <th
                            className="text-center border border-dark"
                            rowSpan={2}>
                            C2+
                          </th>
                          <th
                            className="text-center border border-dark"
                            rowSpan={2}>
                            Cụt đọt
                          </th>
                        </tr>
                        <tr>
                          <th className="text-center border border-dark col-HT">
                            &ge; 50
                          </th>
                          <th className="text-center border border-dark col-HT">
                            &lt; 50
                          </th>
                          <th className="text-center border border-dark col-HT">
                            &ge; 50
                          </th>
                          <th className="text-center border border-dark col-HT">
                            &lt; 50
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <tr key={i}>
                            {/* Ô đầu: số thứ tự */}
                            <td className="text-center border border-dark">
                              {i + 1}
                            </td>

                            {/* Ô 2: hố trống */}
                            <td className="text-center border border-dark">
                              {row.HoTrong != 0 ? row.HoTrong : ""}
                            </td>

                            {/* Ô 3: số cây >=50 */}
                            <td className="text-center border border-dark">
                              {row.CaoT50 != 0 ? row.CaoT50 : ""}
                            </td>

                            {/* Ô 4: số cây <50 */}
                            <td className="text-center border border-dark">
                              {row.CaoD50 != 0 ? row.CaoD50 : ""}
                            </td>

                            {/* Các ô còn lại tùy bạn cần gì thêm */}
                            <td className="text-center border border-dark">
                              {row.ChuaCaoT50 != 0 ? row.ChuaCaoT50 : ""}
                            </td>
                            <td className="text-center border border-dark">
                              {row.ChuaCaoD50 != 0 ? row.ChuaCaoD50 : ""}
                            </td>
                            <td className="text-center border border-dark">
                              {row.C1 != 0 ? row.C1 : ""}
                            </td>
                            <td className="text-center border border-dark">
                              {row.C2 != 0 ? row.C2 : ""}
                            </td>
                            <td className="text-center border border-dark">
                              {row.CutDot != 0 ? row.CutDot : ""}
                            </td>
                          </tr>
                        ))}

                        {/* Dòng tổng thực tế hiển thị các giá trị */}
                        <tr className="fw-bold table-active">
                          <td className="text-center border border-dark">
                            Cộng
                          </td>
                          <td className="text-center border border-dark">
                            {totals.HoTrong != 0 ? totals.HoTrong : ""}
                          </td>
                          <td className="text-center border border-dark">
                            {totals.CaoT50 != 0 ? totals.CaoT50 : ""}
                          </td>
                          <td className="text-center border border-dark">
                            {totals.CaoD50 != 0 ? totals.CaoD50 : ""}
                          </td>
                          <td className="text-center border border-dark">
                            {totals.ChuaCaoT50 != 0 ? totals.ChuaCaoT50 : ""}
                          </td>
                          <td className="text-center border border-dark">
                            {totals.ChuaCaoD50 != 0 ? totals.ChuaCaoD50 : ""}
                          </td>
                          <td className="text-center border border-dark">
                            {totals.C1 != 0 ? totals.C1 : ""}
                          </td>
                          <td className="text-center border border-dark">
                            {totals.C2 != 0 ? totals.C2 : ""}
                          </td>
                          <td className="text-center border border-dark">
                            {totals.CutDot != 0 ? totals.CutDot : ""}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CSS tùy chỉnh */}
      <style jsx>{`
        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          max-height: 660px;
          overflow-y: auto;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 10; /* Đảm bảo tiêu đề nằm trên nội dung bảng */
          background-color: inherit; /* Giữ màu nền của tiêu đề */
        }

        .table th.text-wrap,
        .table td {
          white-space: normal !important;
          padding: 8px;
          vertical-align: middle;
          text-align: center;
        }
        .table th.col-HTPC {
          width: 100px;
        }
        .table th.col-tenCN {
          width: 200px;
        }
        .table th.col-HT {
          width: 100px;
        }

        .table tr.table-active {
          font-weight: bold;
          background-color: #f1f1f1;
        }
        /* Tùy chỉnh thanh trượt ngang */
        .table-responsive::-webkit-scrollbar {
          height: 12px; /* Tăng chiều rộng thanh trượt ngang */
        }
        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1; /* Màu nền của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #888; /* Màu của thanh trượt */
          border-radius: 10px;
        }
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #555; /* Màu khi hover */
        }
      `}</style>
    </Fragment>
  );
};

export default PhieuDaNgoai;
