import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row, Table, } from "react-bootstrap";
import { donVidata } from "../../danhMuc/dinhMuc/dinhMucData";



const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const apiService = {
  getKetQuaTheoDonVi: async () => {
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}kiem-tra-quy-iii/ket-qua/theo-don-vi`);
      const response = await axios.get(url.toString());
      return response.data;
    } catch (error) {
      return null;
    }
  },
  getDinhMuc: async () => {
    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}dinh-muc`);
      url.searchParams.append('TuKhoa', 'KiemTraQuyIII');
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
  const [nam, setNam] = useState("");
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
          th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          .table-active {
            font-weight: bold;
            background-color: #f1f1f1;
          }
          .text-wrap {
            white-space: normal !important;
          }
          @media print {
            body { margin: 40px; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            @page {
              margin: 2px;
            }
          }
        </style>
      </head>
      <body>
        <h2 style="text-align: center; margin-bottom: 10px;">
          CHI TIẾT XÉT THƯỞNG VƯỜN CÂY MỞ CẠO
          ${nam && ` NĂM ${nam}`}
          ${maDonVi &&
      ` - ĐỘI ${donVidata
        .find((dv) => dv.maDonVi === maDonVi)
        ?.donVi.toLocaleUpperCase()}`
      }
        </h2>
        ${tableClone.outerHTML}
        <p style="text-align: right; margin-top: 10px; font-style: italic;">
          In ngày: ${new Date().toLocaleDateString("vi-VN")}
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
    getKetQuaQuyIIITheoDonVi()
    getDinhMuc()
  }, []);

  const getKetQuaQuyIIITheoDonVi = async () => {
    const result = await apiService.getKetQuaTheoDonVi();
    if (result) {
      setDataLo(result.data)
    }
  }

  const getDinhMuc = async () => {
    const result = await apiService.getDinhMuc();
    if (result) {
      setDinhMuc(JSON.parse(result.data.DinhMuc))
    }
  }

  function tinhDiem(tyLeNumber) {
    if(!dinhMuc) return;
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


  return (
    <Fragment>

      <Row className="mt-3">
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Header className="card-header justify-content-between">
              <Card.Title>
                CHI TIẾT XÉT THƯỞNG VƯỜN CÂY MỞ CẠO
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
                <Col xl={2} lg={6} md={6} sm={12}>
                  <Button
                    className="btn btn-primary label-btn"
                    // onClick={loadKQKT}
                    disabled={loading || !nam || !maDonVi}>
                    <i className="bi bi-search label-btn-icon me-2"></i>
                    {loading ? "Đang tải..." : "Tải dữ liệu"}
                  </Button>
                </Col>
                <Col xl={2} lg={6} md={6} sm={12}>
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
                      <th className="text-wrap border" rowSpan={2}>
                        STT
                      </th>
                      <th className="text-wrap border" rowSpan={2}>
                        Đội
                      </th>
                      <th className="text-center border" rowSpan={2}>
                        Tên lô
                      </th>
                      <th className="text-center border" rowSpan={2}>
                        Năm trồng
                      </th>
                      <th className="text-wrap border" rowSpan={2}>
                        Hạng đất
                      </th>
                      <th className="text-wrap border" rowSpan={2}>
                        Giống
                      </th>
                      <th className="text-wrap border" rowSpan={2}>
                        Diện tích KK
                      </th>
                      <th className="text-wrap border" rowSpan={2}>
                        Diện tích MC
                      </th>
                      <th className="text-wrap border col-HT" rowSpan={2}>
                        Tổng số hố KT
                      </th>
                      <th className="text-wrap border" rowSpan={2}>
                        Hố trống
                      </th>
                      <th className="text-wrap border" colSpan={3}>
                        Cây chưa cạo
                      </th>
                      <th className="text-wrap border" colSpan={3}>
                        Cây cạo
                      </th>
                      <th className="text-wrap border" colSpan={2}>
                        Kết quả
                      </th>
                      <th className="text-wrap border col-TLVP" rowSpan={2}>
                        Tỷ lệ vi phạm (%)
                      </th>
                      <th className="text-wrap border" rowSpan={2}>
                        DT xét thưởng
                      </th>
                    </tr>
                    <tr>
                      <th className="text-wrap border">&ge; 50</th>
                      <th className="text-wrap border">&lt; 50</th>
                      <th className="text-wrap border">Tổng</th>
                      <th className="text-wrap border">&ge; 50</th>
                      <th className="text-wrap border">&lt; 50</th>
                      <th className="text-wrap border">Tổng</th>
                      <th className="text-wrap border col-TLDV">
                        Tỷ lệ cây đạt vanh (%)
                      </th>
                      <th>Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataLo.map((cn, idx) => {
                      // Calculate values
                      const hoTrong = cn.soHoTrong || 0;
                      const cayChuaCaoT50 = cn.soCayChuaCaoTren50 || 0;
                      const cayChuaCaoD50 = cn.soCayChuaCaoDuoi50 || 0;
                      const tongCayChuaCao = cayChuaCaoT50 + cayChuaCaoD50;
                      const cayCaoT50 = cn.soCayCaoTren50 || 0;
                      const cayCaoD50 = cn.soCayCaoDuoi50 || 0;
                      const tongCayCao = cayCaoT50 + cayCaoD50;

                      // Calculate result columns
                      const tyLeCayDatVanh =
                        (hoTrong + tongCayChuaCao + tongCayCao) > 0
                          ? ((tongCayCao / (hoTrong + tongCayChuaCao + tongCayCao)) * 100).toFixed(1)
                          : "0.0";

                      // Calculate điểm based on TLMoCao table
                      const tyLeNumber = parseFloat(tyLeCayDatVanh);
                      let diem = 0;

                      if (tyLeNumber > 90) diem = 10;
                      else if (tyLeNumber > 80) diem = 9;
                      else if (tyLeNumber >= 75) diem = 8;
                      else if (tyLeNumber < 75) diem = 6;

                      const tyLeViPham = (
                        (cn.soCayCaoDuoi50 / (cn.soHoTrong + (cayChuaCaoT50 + cayChuaCaoD50) + (cayCaoT50 + cayCaoD50))) *
                        100
                      ).toFixed(1);

                      // Calculate dtXetThuong: if violation rate = 0, use dienTichMC, otherwise use current value
                      const dtXetThuong =
                        parseFloat(tyLeViPham) === 0
                          ? cn.dienTichMC || 0
                          : cn.dtXetThuong || 0;

                      return (
                        <tr key={idx}>
                          <td className="text-wrap border">{idx + 1}</td>
                          <td className="text-wrap border">{cn.nongTruong}</td>
                          <td className="text-wrap border">{cn.tenLo}</td>
                          <td className="text-wrap border">{cn.namTrong}</td>
                          <td className="text-wrap border">{cn.hangDat}</td>
                          <td className="text-wrap border">{cn.giongCay}</td>
                          <td className="text-wrap border">
                            {cn.dienTich != null ? Number(cn.dienTich).toFixed(2) : ""}
                          </td>

                          <td className="text-wrap border">{cn.dienTichMC}</td>
                          <td className="text-wrap border">{hoTrong + tongCayChuaCao + tongCayCao}</td>
                          <td className="text-wrap border">{hoTrong}</td>
                          <td className="text-wrap border">{cn.soCayChuaCaoTren50}</td>
                          <td className="text-wrap border">{cn.soCayChuaCaoDuoi50}</td>
                          <td className="text-wrap border">{tongCayChuaCao}</td>
                          <td className="text-wrap border">{cn.soCayCaoTren50}</td>
                          <td className="text-wrap border">{cn.soCayCaoDuoi50}</td>
                          <td className="text-wrap border">{tongCayCao}</td>
                          <td className="text-wrap border">{tyLeNumber}</td>
                          <td className="text-wrap border">{tinhDiem(tyLeNumber)}</td>
                          <td className="text-wrap border">{tyLeViPham}</td>
                          <td className="text-wrap border">{dtXetThuong}</td>
                        </tr>
                      );
                    })}
                    {dataLo.length > 0 && (
                      <tr className="table-active ">
                        <td colSpan="6">
                          <strong>CỘNG</strong>
                        </td>
                        <td>
                          {" "}
                          <strong>
                            {dataLo.reduce(
                              (sum, item) => sum + (Number(item.dienTich).toFixed(2) || 0),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          {" "}
                          <strong>
                            {dataLo.reduce(
                              (sum, item) => sum + (item.dienTichMC || 0),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce(
                              (sum, item) => sum + (item.tongHoKT || 0),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce(
                              (sum, item) => sum + (item.hoTrong || 0),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce(
                              (sum, item) => sum + (item.cayChuaCaoT50 || 0),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce(
                              (sum, item) => sum + (item.cayChuaCaoD50 || 0),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce(
                              (sum, item) =>
                                sum +
                                ((item.cayChuaCaoT50 || 0) +
                                  (item.cayChuaCaoD50 || 0)),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce(
                              (sum, item) => sum + (item.cayCaoT50 || 0),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce(
                              (sum, item) => sum + (item.cayCaoD50 || 0),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce(
                              (sum, item) =>
                                sum +
                                ((item.cayCaoT50 || 0) + (item.cayCaoD50 || 0)),
                              0
                            )}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce((sum, item) => {
                              const tongCayCao =
                                (item.cayCaoT50 || 0) + (item.cayCaoD50 || 0);
                              return item.tongHoKT > 0
                                ? ((tongCayCao / item.tongHoKT) * 100).toFixed(
                                  1
                                )
                                : "0.00";
                            }, 0)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.length > 0
                              ? (
                                dataLo.reduce((sum, item) => {
                                  const tongCayCao =
                                    (item.cayCaoT50 || 0) +
                                    (item.cayCaoD50 || 0);
                                  const tyLeCayDatVanh =
                                    item.tongHoKT > 0
                                      ? (tongCayCao / item.tongHoKT) * 100
                                      : 0;

                                  let diem = 0;
                                  if (tyLeCayDatVanh > 90) diem = 10;
                                  else if (tyLeCayDatVanh > 80) diem = 9;
                                  else if (tyLeCayDatVanh >= 75) diem = 8;
                                  else if (tyLeCayDatVanh < 75) diem = 6;

                                  return sum + diem;
                                }, 0) / dataLo.length
                              ).toFixed(1)
                              : "0.0"}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce((sum, item) => {
                              return item.tongHoKT > 0
                                ? (
                                  (item.cayCaoD50 / item.tongHoKT) *
                                  100
                                ).toFixed(1)
                                : "0.0";
                            }, 0)}
                          </strong>
                        </td>
                        <td>
                          <strong>
                            {dataLo.reduce((sum, item) => {
                              // Calculate violation rate for this item
                              const tyLeViPham =
                                item.tongHoKT > 0
                                  ? (item.cayCaoD50 / item.tongHoKT) * 100
                                  : 0;

                              // Use the same logic as individual rows: if violation rate = 0, use dienTichMC, otherwise use dtXetThuong
                              const dtXetThuong =
                                parseFloat(tyLeViPham) === 0
                                  ? parseFloat(item.dienTichMC || 0)
                                  : parseFloat(item.dtXetThuong || 0);

                              return sum + dtXetThuong;
                            }, 0)}
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
