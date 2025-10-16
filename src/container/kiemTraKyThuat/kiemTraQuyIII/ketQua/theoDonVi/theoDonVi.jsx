import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { donVidata } from "../../danhMuc/dinhMuc/dinhMucData";
import { useToast } from "../../../../../contexts/ToastContext";

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const apiService = {
  getKetQuaTheoDonVi: async (year, maDonVi) => {
    try {
      const url = new URL(
        `${import.meta.env.VITE_API_URL}kiem-tra-quy-iii/ket-qua/theo-don-vi`
      );
      url.searchParams.append("year", year);
      url.searchParams.append("maDonVi", maDonVi);
      const response = await axios.get(url.toString());
      return response.data;
    } catch (error) {
      return null;
    }
  },
  getDinhMuc: async () => {
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}dinh-muc`);
      url.searchParams.append("TuKhoa", "KiemTraQuyIII");
      const response = await axios.get(url.toString());
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

const KQtheoDonVi = () => {
  const [dataLo, setDataLo] = useState([]);
  const [dinhMuc, setDinhMuc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nam, setNam] = useState(new Date().getFullYear());
  const [maDonVi, setMaDonVi] = useState("");

  // Helper function để hiển thị giá trị, nếu 0 thì để trống
  const formatDisplayValue = (value) => {
    if (
      value === 0 ||
      value === "0" ||
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "";
    }
    return value;
  };

  // Function to print the table
  const printTable = () => {
    if (dataLo.length === 0) {
      showToast({
        title: "Thông báo",
        message: "Không có dữ liệu để in. Hãy bấm Tải dữ liệu trước.",
        variant: "success",
      });
      return;
    }

    const printWindow = window.open("", "_blank");
    const tableElement = document.getElementById("bangNhap");

    if (!tableElement) {
      showToast({
        title: "Thông báo",
        message: "Không tìm thấy bảng dữ liệu.",
        variant: "success",
      });

      return;
    }

    // Clone the table to avoid modifying the original
    const tableClone = tableElement.cloneNode(true);

    // Create print-friendly HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
      
        <title>Báo cáo kết quả kiểm tra mở cạo</title>
        <style>
          body {
            font-family: "Times New Roman", Times, serif;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            border: 1px solid #000;
          }
          th, td {
            border: 1px solid #000;
            padding: 3px;
            text-align: center;
            vertical-align: middle;
          }

          .table-dashed {
          border: 1px dashed rgba(0, 0, 0, 0.3); /* viền nét đứt mờ */
          border-collapse: collapse;
          }

          .table-dashed th,
          .table-dashed td {
          border: 1px dashed rgba(0, 0, 0, 0.3);
          
          text-align: center;
}

          table th.col-TLDV{
          width: 50px;
          wrap-text: break-word;
          }

          table th.col-cay{
          width: 50px;
          wrap-text: break-word;
          }

          .table th.col-TLVP,
          .table th.col-HT
          {
           width: 60px;
          wrap-text: break-word;}

          .table th.col-doi {
          width: 50px;
          }

          th{
            background-color: #f0f0f0;
            font-weight: bold;
            height:10px;
            border: 1px solid #000;
          }
          .table-active {
            font-weight: bold;
            background-color: #f1f1f1;
          }
          .text-wrap {
            white-space: normal !important;
          }
             #header-block p {
            margin: 0;
            font-size: 20px;}
          @media print {
            body { margin: 0 40px; }
            table { page-break-inside: auto; border: 1px solid #000; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            @page {
              size: A4 landscape; /* hoặc landscape nếu bạn cần ngang */
              margin: 50px 0;         /* để không bị cắt khi scale */
            }
          }
        </style>
      </head>
      <body>
        <div id="header-block" class="print-Wapper">
            <div class="row">
              <div class="col-4" style="display: flex; flex-direction: column; justify-content: center; align-items: center;"> 
                <p>CÔNG TY TNHH MỘT THÀNH VIÊN</p>
                <p>TỔNG CÔNG TY CAO SU ĐỒNG NAI</p>
                <p><b>PHÒNG QUẢN LÝ KỸ THUẬT</b></p>
              </div>
            </div>
          </div>


        <h4 style="text-align: center; margin: 20px 0; font-weight: bold;">
          CHI TIẾT KẾT QUẢ VƯỜN CÂY MỞ CẠO
          ${nam && ` NĂM ${nam}`}
          ${
            maDonVi &&
            ` - ĐỘI ${donVidata
              .find((dv) => dv.maDonVi === maDonVi)
              ?.donVi.toLocaleUpperCase()}`
          }
        </h4>
        ${tableClone.outerHTML}
        <p style="text-align: right; margin-top: 10px; font-style: italic;">
          
        </p>
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

  useEffect(() => {
    getDinhMuc();
    getKetQuaQuyIIITheoDonVi();
  }, []);

  const getKetQuaQuyIIITheoDonVi = async () => {
    const result = await apiService.getKetQuaTheoDonVi(nam, maDonVi);
    if (result) {
      setDataLo(result.data);
    }
  };

  const getDinhMuc = async () => {
    const result = await apiService.getDinhMuc();
    if (result) {
      setDinhMuc(JSON.parse(result.data.DinhMuc));
    }
  };

  function tinhDiem(tyLeNumber) {
    if (!dinhMuc) return;
    for (const rule of dinhMuc) {
      const { tyLe, diem } = rule;

      if (tyLe.startsWith(">=")) {
        const value = parseFloat(tyLe.replace(">=", ""));
        if (tyLeNumber >= value) return diem;
      } else if (tyLe.startsWith(">")) {
        const value = parseFloat(tyLe.replace(">", ""));
        if (tyLeNumber > value) return diem;
      } else if (tyLe.startsWith("<=")) {
        const value = parseFloat(tyLe.replace("<=", ""));
        if (tyLeNumber <= value) return diem;
      } else if (tyLe.startsWith("<")) {
        const value = parseFloat(tyLe.replace("<", ""));
        if (tyLeNumber < value) return diem;
      } else if (tyLe.startsWith("=")) {
        const value = parseFloat(tyLe.replace("=", ""));
        if (tyLeNumber === value) return diem;
      }
    }

    return null; // nếu không match rule nào
  }

  // Gom tất cả reduce vào một chỗ
  const totals = dataLo.reduce(
    (acc, item) => {
      const hoTrong = item.soHoTrong || 0;
      const cayChuaCaoT50 = item.soCayChuaCaoTren50 || 0;
      const cayChuaCaoD50 = item.soCayChuaCaoDuoi50 || 0;
      const tongCayChuaCao = cayChuaCaoT50 + cayChuaCaoD50;
      const cayCaoT50 = item.soCayCaoTren50 || 0;
      const cayCaoD50 = item.soCayCaoDuoi50 || 0;
      const tongCayCao = cayCaoT50 + cayCaoD50;
      const denominator = hoTrong + tongCayChuaCao + tongCayCao;

      // Tỷ lệ cây đạt vanh
      const tyLeCayDatVanh =
        denominator > 0 ? (tongCayCao / denominator) * 100 : 0;

      // Điểm
      const diem = tinhDiem(tyLeCayDatVanh);

      // Tỷ lệ vi phạm
      const tyLeViPham = denominator > 0 ? (cayCaoD50 / denominator) * 100 : 0;

      // Diện tích xét thưởng
      const dtXetThuong =
        diem >= 8
          ? parseFloat(tyLeViPham) === 0
            ? parseFloat(item.dienTichMC || 0)
            : parseFloat(item.dtXetThuong || 0)
          : 0;

      // Cộng dồn
      acc.dienTich += Number(item.dienTich) || 0;
      acc.dienTichMC += Number(item.dienTichMC) || 0;
      acc.tongHoKT += denominator;
      acc.hoTrong += hoTrong;
      acc.cayChuaCaoT50 += cayChuaCaoT50;
      acc.cayChuaCaoD50 += cayChuaCaoD50;
      acc.tongCayChuaCao += tongCayChuaCao;
      acc.cayCaoT50 += cayCaoT50;
      acc.cayCaoD50 += cayCaoD50;
      acc.tongCayCao += tongCayCao;
      acc.diem += diem;
      acc.tyLeCayDatVanh.push(tyLeCayDatVanh);
      acc.tyLeViPham.push(tyLeViPham);
      acc.dtXetThuong += dtXetThuong;

      return acc;
    },
    {
      dienTich: 0,
      dienTichMC: 0,
      tongHoKT: 0,
      hoTrong: 0,
      cayChuaCaoT50: 0,
      cayChuaCaoD50: 0,
      tongCayChuaCao: 0,
      cayCaoT50: 0,
      cayCaoD50: 0,
      tongCayCao: 0,
      diem: 0,
      tyLeCayDatVanh: [],
      tyLeViPham: [],
      dtXetThuong: 0,
    }
  );

  // Tính trung bình điểm & tỷ lệ
  const avgDiem =
    dataLo.length > 0 ? (totals.diem / dataLo.length).toFixed(1) : "0.0";
  const avgTyLeCayDatVanh =
    totals.tongHoKT > 0
      ? ((totals.tongCayCao / totals.tongHoKT) * 100).toFixed(1)
      : "0.0";
  const avgTyLeViPham =
    totals.tongHoKT > 0
      ? ((totals.cayCaoD50 / totals.tongHoKT) * 100).toFixed(1)
      : "0.0";

  return (
    <Fragment>
      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                CHI TIẾT KẾT QUẢ VƯỜN CÂY MỞ CẠO
                {nam && <> NĂM {nam}</>}
                {maDonVi && (
                  <>
                    {" "}
                    -{" ĐỘI "}
                    {donVidata
                      .find((dv) => dv.maDonVi === maDonVi)
                      ?.donVi.toLocaleUpperCase()}
                  </>
                )}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Form.Select
                    aria-label="Chọn năm"
                    value={nam}
                    onChange={(e) => setNam(e.target.value)}>
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
                    value={maDonVi}
                    onChange={(e) => setMaDonVi(e.target.value)}>
                    <option value="">Chọn đơn vị</option>
                    {donVidata.map((dv) => (
                      <option key={dv.id} value={dv.maDonVi}>
                        {dv.maDonVi} - {dv.donVi}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xl={4} lg={6} md={6} sm={12} className="d-flex gap-3">
                  <Button
                    className="btn btn-primary label-btn"
                    onClick={getKetQuaQuyIIITheoDonVi}>
                    <i className="bi bi-search label-btn-icon me-2"></i>
                    {loading ? "Đang tải..." : "Tải dữ liệu"}
                  </Button>
                  <Button
                    className="btn btn-success label-btn"
                    onClick={printTable}
                    disabled={dataLo.length === 0}>
                    <i className="bi bi-printer label-btn-icon me-2"></i>
                    In báo cáo
                  </Button>
                </Col>
              </Row>

              <div className="table-responsive">
                <Table className="table text-nowrap table-dashed" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap border border-dark" rowSpan={2}>
                        STT
                      </th>
                      <th
                        className="text-wrap border border-dark col-doi"
                        rowSpan={2}>
                        Đội
                      </th>
                      <th
                        className="text-center border border-dark"
                        rowSpan={2}>
                        Tên lô
                      </th>
                      <th
                        className="text-center border border-dark"
                        rowSpan={2}>
                        Năm trồng
                      </th>
                      <th className="text-wrap border border-dark" rowSpan={2}>
                        Hạng đất
                      </th>
                      <th className="text-wrap border border-dark" rowSpan={2}>
                        Giống
                      </th>
                      <th className="text-wrap border border-dark" rowSpan={2}>
                        Diện tích KK
                      </th>
                      <th className="text-wrap border border-dark" rowSpan={2}>
                        Diện tích MC
                      </th>
                      <th
                        className="text-wrap border border-dark col-HT"
                        rowSpan={2}>
                        Tổng số hố KT
                      </th>
                      <th className="text-wrap border border-dark" rowSpan={2}>
                        Hố trống
                      </th>
                      <th className="text-wrap border border-dark" colSpan={3}>
                        Cây chưa cạo
                      </th>
                      <th className="text-wrap border border-dark" colSpan={3}>
                        Cây cạo
                      </th>
                      <th className="text-wrap border border-dark" colSpan={2}>
                        Kết quả
                      </th>
                      <th
                        className="text-wrap border border-dark col-TLVP"
                        rowSpan={2}>
                        Tỷ lệ vi phạm (%)
                      </th>
                      <th className="text-wrap border border-dark" rowSpan={2}>
                        DT tỷ lệ vanh &ge; 75% (ha)
                      </th>
                    </tr>
                    <tr>
                      <th className="text-wrap border border-dark col-cay">
                        &ge; 50
                      </th>
                      <th className="text-wrap border border-dark col-cay">
                        &lt; 50
                      </th>
                      <th className="text-wrap border border-dark col-cay">
                        Tổng
                      </th>
                      <th className="text-wrap border border-dark col-cay">
                        &ge; 50
                      </th>
                      <th className="text-wrap border border-dark col-cay">
                        &lt; 50
                      </th>
                      <th className="text-wrap border border-dark col-cay">
                        Tổng
                      </th>
                      <th className="text-wrap border border-dark col-TLDV">
                        Tỷ lệ cây đạt vanh (%)
                      </th>
                      <th className="text-wrap border border-dark"> Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataLo.map((cn, idx) => {
                      const hoTrong = cn.soHoTrong || 0;
                      const cayChuaCaoT50 = cn.soCayChuaCaoTren50 || 0;
                      const cayChuaCaoD50 = cn.soCayChuaCaoDuoi50 || 0;
                      const tongCayChuaCao = cayChuaCaoT50 + cayChuaCaoD50;
                      const cayCaoT50 = cn.soCayCaoTren50 || 0;
                      const cayCaoD50 = cn.soCayCaoDuoi50 || 0;
                      const tongCayCao = cayCaoT50 + cayCaoD50;
                      const tongHoKT = hoTrong + tongCayChuaCao + tongCayCao;

                      const tyLeCayDatVanh =
                        tongHoKT > 0
                          ? ((tongCayCao / tongHoKT) * 100).toFixed(1)
                          : "0.0";

                      const tyLeNumber = parseFloat(tyLeCayDatVanh);
                      let diem = 0;
                      if (tyLeNumber > 90) diem = 10;
                      else if (tyLeNumber > 80) diem = 9;
                      else if (tyLeNumber >= 75) diem = 8;
                      else if (tyLeNumber < 75) diem = 6;

                      const tyLeViPham =
                        tongHoKT > 0
                          ? ((cayCaoD50 / tongHoKT) * 100).toFixed(1)
                          : "0.0";

                      const dtXetThuong =
                        diem >= 8
                          ? parseFloat(tyLeViPham) === 0
                            ? parseFloat(cn.dienTichMC || 0)
                            : parseFloat(cn.dtXetThuong || 0)
                          : 0;

                      return (
                        <tr key={idx}>
                          <td className="border border-dark">{idx + 1}</td>
                          <td className="border border-dark">
                            {cn.nongTruong}
                          </td>
                          <td className="border border-dark">{cn.tenLo}</td>
                          <td className="border border-dark">{cn.namTrong}</td>
                          <td className="border border-dark">{cn.hangDat}</td>
                          <td className="border border-dark">{cn.giongCay}</td>
                          <td className="border border-dark text-end">
                            {cn.dienTich != null && Number(cn.dienTich) !== 0
                              ? Number(cn.dienTich).toFixed(4)
                              : ""}
                          </td>
                          <td className="border border-dark text-end">
                            {cn.dienTichMC != null &&
                            Number(cn.dienTichMC) !== 0
                              ? Number(cn.dienTichMC).toFixed(4)
                              : ""}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(tongHoKT)}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(hoTrong)}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(cn.soCayChuaCaoTren50)}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(cn.soCayChuaCaoDuoi50)}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(tongCayChuaCao)}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(cn.soCayCaoTren50)}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(cn.soCayCaoDuoi50)}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(tongCayCao)}
                          </td>
                          <td className="border border-dark">
                            {tyLeNumber === 0 ? "" : tyLeNumber}
                          </td>
                          <td className="border border-dark">
                            {formatDisplayValue(diem)}
                          </td>
                          <td className="border border-dark">
                            {parseFloat(tyLeViPham) === 0 ? "" : tyLeViPham}
                          </td>
                          <td className="border border-dark">
                            {dtXetThuong === 0 ? "" : dtXetThuong.toFixed(4)}
                          </td>
                        </tr>
                      );
                    })}

                    {dataLo.length > 0 && (
                      <tr className="table-active">
                        <td colSpan="6" className="border border-dark">
                          <strong>CỘNG</strong>
                        </td>
                        <td className="border border-dark text-end">
                          <strong>
                            {totals.dienTich === 0
                              ? ""
                              : totals.dienTich.toFixed(4)}
                          </strong>
                        </td>
                        <td className="border border-dark text-end">
                          <strong>
                            {totals.dienTichMC === 0
                              ? ""
                              : totals.dienTichMC.toFixed(4)}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>{formatDisplayValue(totals.tongHoKT)}</strong>
                        </td>
                        <td className="border border-dark">
                          <strong>{formatDisplayValue(totals.hoTrong)}</strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {formatDisplayValue(totals.cayChuaCaoT50)}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {formatDisplayValue(totals.cayChuaCaoD50)}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {formatDisplayValue(totals.tongCayChuaCao)}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {formatDisplayValue(totals.cayCaoT50)}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {formatDisplayValue(totals.cayCaoD50)}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {formatDisplayValue(totals.tongCayCao)}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {parseFloat(avgTyLeCayDatVanh) === 0
                              ? ""
                              : avgTyLeCayDatVanh}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {parseFloat(avgDiem) === 0 ? "" : avgDiem}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {parseFloat(avgTyLeViPham) === 0
                              ? ""
                              : avgTyLeViPham}
                          </strong>
                        </td>
                        <td className="border border-dark">
                          <strong>
                            {totals.dtXetThuong === 0
                              ? ""
                              : totals.dtXetThuong.toFixed(4)}
                          </strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
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
        .table th.col-maCN {
          width: 120px;
        }

        .table th.col-TLDV {
          width: 80px;
        }

        .table th.col-TLVP,
        .table th.col-HT {
          width: 60px;
        }

        .table th.col-doi {
          width: 50px;
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

export default KQtheoDonVi;
