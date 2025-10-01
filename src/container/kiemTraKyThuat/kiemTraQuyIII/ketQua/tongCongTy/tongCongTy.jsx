import { Fragment, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { donVidata } from "../../danhMuc/dinhMuc/dinhMucData";

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

  // Function to print the table
  const printTable = () => {
    if (dataLo.length === 0) {
      alert("Không có dữ liệu để in!");
      return;
    }

    const printWindow = window.open("", "_blank");
    const tableElement = document.getElementById("bangNhap");

    if (!tableElement) {
      alert("Không tìm thấy bảng dữ liệu!");
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
            margin: 2px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }

          .table th.col-diem {
          width: 80px;
        }
        .table th.col-tyLeVanhDuoi75,
          .table th.col-tyLeVanhDuoi50 {
          width: 100px;
        }
          th, td {
            border: 1px solid #000;
            padding: 3px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
            height:10px;
          }
          .table-active {
            font-weight: bold;
            background-color: #f1f1f1;
          }
          .text-wrap {
            white-space: normal !important;
          }
          @media print {
            body { margin: 40px 0; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            @page {
              margin: 0 30px;
              size: A4 landscape;
            }
          }
        </style>
      </head>
      <body>
        <div id="header-block" class="print-Wapper">
              <col xl={3} className="text-center" style="width: 50%; line-height: 1.6; font-size: 14px;"> 
              <p><b>CÔNG TY TNHH MỘT THÀNH VIÊN</b></p>
              <p><b>TỔNG CÔNG TY CAO SU ĐỒNG NAI</b></p>
              <p><b>PHÒNG QUẢN LÝ KỸ THUẬT</b></p>
              </col>
          </div>
        <h4 style="text-align: center; margin: 30px 0; font-weight: bold;">
          TỔNG HỢP XÉT THƯỞNG VƯỜN CÂY MỞ CẠO
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
          ? parseFloat(item.dienTichMC || 0)
          : parseFloat(item.dtXetThuong || 0);

      // Cộng dồn
      acc.dienTich += denominator > 0 ? Number(item.dienTich) : 0;
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

  const groupedArray = useMemo(() => {
    const grouped = dataLo.reduce((acc, item) => {
      const key = item.nongTruong;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((key) => {
      const items = grouped[key];
      const aggregated = items.reduce(
        (agg, item) => {
          const hoTrong = item.soHoTrong || 0;
          const cayChuaCaoT50 = item.soCayChuaCaoTren50 || 0;
          const cayChuaCaoD50 = item.soCayChuaCaoDuoi50 || 0;
          const tongCayChuaCao = cayChuaCaoT50 + cayChuaCaoD50;
          const cayCaoT50 = item.soCayCaoTren50 || 0;
          const cayCaoD50 = item.soCayCaoDuoi50 || 0;
          const tongCayCao = cayCaoT50 + cayCaoD50;
          const denominator = hoTrong + tongCayChuaCao + tongCayCao;

          const tyLeCayDatVanh =
            denominator > 0 ? (tongCayCao / denominator) * 100 : 0;
          const diem = tinhDiem(tyLeCayDatVanh);
          const tyLeViPham =
            denominator > 0 ? (cayCaoD50 / denominator) * 100 : 0;
          const dtXetThuong =
            diem >= 8
              ? parseFloat(item.dienTichMC || 0)
              : parseFloat(item.dtXetThuong || 0);

          const dt75 = tyLeCayDatVanh >= 75 ? dtXetThuong : 0;
          const dtDuoi75 = tyLeCayDatVanh < 75 ? dtXetThuong : 0;
          const dtCayDuoi50 = tyLeViPham > 0 ? item.dienTichMC : 0;

          agg.dienTichMC += Number(item.dienTichMC) || 0;
          agg.tongHoKT += denominator;
          agg.dienTich += denominator > 0 ? Number(item.dienTich) : 0;
          agg.hoTrong += hoTrong;
          agg.cayChuaCaoT50 += cayChuaCaoT50;
          agg.cayChuaCaoD50 += cayChuaCaoD50;
          agg.tongCayChuaCao += tongCayChuaCao;
          agg.cayCaoT50 += cayCaoT50;
          agg.cayCaoD50 += cayCaoD50;
          agg.tongCayCao += tongCayCao;
          agg.dt75 += dt75;
          agg.dtDuoi75 += dtDuoi75;
          agg.dtCayDuoi50 += dtCayDuoi50;
          agg.dt8 += diem === 8 ? dt75 : 0;
          agg.dt9 += diem === 9 ? dt75 : 0;
          agg.dt10 += diem === 10 ? dt75 : 0;
          agg.tyLeCayDatVanh.push(tyLeCayDatVanh);
          agg.tyLeViPham.push(tyLeViPham);

          return agg;
        },
        {
          maDonVi: key,
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
          dt75: 0,
          dtDuoi75: 0,
          dtCayDuoi50: 0,
          dt8: 0,
          dt9: 0,
          dt10: 0,
          tyLeCayDatVanh: [],
          tyLeViPham: [],
        }
      );

      const overallTyLeCayDatVanh =
        aggregated.tongHoKT > 0
          ? (aggregated.tongCayCao / aggregated.tongHoKT) * 100
          : 0;
      aggregated.overallTyLeCayDatVanh = overallTyLeCayDatVanh;
      aggregated.diem = tinhDiem(overallTyLeCayDatVanh);
      aggregated.diemTru = aggregated.dtCayDuoi50 > 0 ? 1 : 0;
      aggregated.tongDiem = 100 - aggregated.diemTru;

      return aggregated;
    });
  }, [dataLo]);

  return (
    <Fragment>
      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                TỔNG HỢP KẾT QUẢ KIỂM TRA VƯỜN CÂY MỞ CẠO NĂM{" "}
                {nam && <> NĂM {nam}</>}
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

                <Col
                  xl={3}
                  lg={6}
                  md={6}
                  sm={12}
                  className="d-flex align-items-center justify-content-start gap-3">
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
                <Table className="table text-nowrap" id="bangNhap">
                  <thead className="sticky-header">
                    <tr>
                      <th className="text-wrap " rowSpan={3}>
                        STT
                      </th>
                      <th className="text-wrap col-doi" rowSpan={3}>
                        Đội
                      </th>
                      <th className="text-center" rowSpan={3}>
                        Diện tích MC
                      </th>
                      <th className="text-center " rowSpan={3}>
                        Diện tích KT
                      </th>
                      <th className="text-wrap col-tyLeVanhDuoi50" rowSpan={3}>
                        Tỷ lệ cây đạt vanh(%)
                      </th>
                      <th className="text-wrap " colSpan={4}>
                        Diện tích có tỷ lệ vanh ≥75% (ha)
                      </th>
                      <th className="text-wrap col-tyLeVanhDuoi75" rowSpan={3}>
                        Diện tích có tỷ lệ đạt vanh dưới 75% (ha)
                      </th>
                      <th className="text-wrap col-tyLeVanhDuoi50" rowSpan={3}>
                        Diện tích mở cạo cây dưới 50 cm (ha)
                      </th>
                      <th className="text-wrap " rowSpan={3}>
                        Điểm trừ
                      </th>
                      <th className="text-wrap " rowSpan={3}>
                        Điểm xếp hạng
                      </th>
                      <th className="text-wrap " rowSpan={3}>
                        Ghi chú
                      </th>
                    </tr>
                    <tr>
                      <th className="text-wrap " colSpan={3}>
                        Theo điểm
                      </th>
                      <th className="text-wrap col-diem" rowSpan={2}>
                        Cộng
                      </th>
                    </tr>
                    <tr>
                      <th className="col-diem">8</th>
                      <th className="col-diem">9</th>
                      <th className="col-diem">10</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedArray.map((cn, idx) => {
                      const dt8 = cn.dt8 || "-";
                      const dt9 = cn.dt9 || "-";
                      const dt10 = cn.dt10 || "-";
                      const dienTichMC = cn.dienTichMC || "-";
                      const dienTich = cn.dienTich || "-";
                      const overallTyLeCayDatVanh =
                        cn.overallTyLeCayDatVanh || "-";
                      const cong = cn.dt8 + cn.dt9 + cn.dt10 || "-";
                      const dtDuoi75 = cn.dtDuoi75 || "-";
                      const dtCayDuoi50 = cn.dtCayDuoi50 || "-";
                      const diemTru = cn.dtCayDuoi50 > 0 ? 1 : 0;
                      const diemXepHang =
                        cn.dienTichMC > 0 ? 100 - diemTru : "-";

                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td className="text-left">
                            {donVidata.find((dv) => dv.maDonVi === cn.maDonVi)
                              ?.donVi ||
                              cn.maDonVi ||
                              "N/A"}
                          </td>
                          <td>{dienTichMC.toFixed(4)}</td>
                          <td>{dienTich}</td>
                          <td>{overallTyLeCayDatVanh}</td>
                          <td>{dt8}</td>
                          <td>{dt9}</td>
                          <td>{dt10}</td>
                          <td>{cong}</td>
                          <td>{dtDuoi75}</td>
                          <td>{dtCayDuoi50}</td>
                          <td>{diemTru}</td>
                          <td>{diemXepHang}</td>
                          <td></td>
                        </tr>
                      );
                    })}
                    {groupedArray.length > 0 && (
                      <tr className="table-active">
                        <td colSpan="2">
                          <strong>TỔNG CỘNG</strong>
                        </td>
                        <td>
                          <strong>{totals.dienTichMC.toFixed(4)}</strong>
                        </td>
                        <td>
                          <strong>{totals.dienTich.toFixed(4)}</strong>
                        </td>
                        <td>
                          <strong>{avgTyLeCayDatVanh}</strong>
                        </td>
                        <td>
                          <strong>
                            {groupedArray
                              .reduce((acc, item) => acc + item.dt8, 0)
                              .toFixed(4)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {groupedArray
                              .reduce((acc, item) => acc + item.dt9, 0)
                              .toFixed(4)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {groupedArray
                              .reduce((acc, item) => acc + item.dt10, 0)
                              .toFixed(4)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {groupedArray
                              .reduce((acc, item) => acc + item.dt75, 0)
                              .toFixed(4)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {(
                              groupedArray.reduce(
                                (acc, item) => acc + item.dienTich,
                                0
                              ) -
                              groupedArray.reduce(
                                (acc, item) => acc + item.dt75,
                                0
                              )
                            ).toFixed(2)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {groupedArray
                              .reduce((acc, item) => acc + item.dtCayDuoi50, 0)
                              .toFixed(2)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {groupedArray.reduce(
                              (acc, item) => acc + item.diemTru,
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {100 -
                              groupedArray.reduce(
                                (acc, item) => acc + item.diemTru,
                                0
                              )}
                          </strong>
                        </td>
                        <td></td>
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
        .table th.col-diem {
          width: 80px;
        }
        .table th.col-tyLeVanhDuoi75,
        .table th.col-tyLeVanhDuoi50 {
          width: 150px;
        }
        .table th.col-doi {
          width: 120px;
        }

        .table th.col-TLDV,
        .table th.col-TLVP,
        .table th.col-HT {
          width: 80px;
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
