import { FC, useEffect, useState } from "react";
import { TableProp, TreatmentType } from "../types/type";
import { Modal } from "antd";
import formatMoney from "../lib/money_format";

const OrtaTreatmentModal: FC<TableProp> = ({ data, setData }) => {
  const token = localStorage.getItem("auth");
  const [treatments, setTreatments] = useState<TreatmentType[]>([]);
  useEffect(() => {
    if (data.data) {
      fetch(
        import.meta.env.VITE_APP_URL + "/orto-cure/cure-service/" + data.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then(({ result }) => {
          setTreatments(result);
        });
    }
  }, [data.data, token]);

  return (
    <>
      <Modal
        width={600}
        title="Foydalanilgan xizmatlar bo'yicha ma'lumot"
        centered
        open={data.isOpen}
        onCancel={() => setData({ data: "", isOpen: false })}
        footer
        className="treatment_modal"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr className="table_wrapper">
              <th className="table_item">Tish id</th>
              <th className="table_item">Xizmat nomi</th>
              <th className="table_item">Texnik puli</th>
              <th className="table_item">To'lov miqdori</th>
            </tr>
          </thead>
          <tbody>
            {treatments?.map((e, i) => {
              return (
                <tr className="table_wrapper" key={i}>
                  <td className="table_item">{e.tooth_id}</td>
                  <td className="table_item">{e.service_name}</td>
                  <td className="table_item">
                    {formatMoney(+e?.technic_price)}
                  </td>
                  <td className="table_item">{formatMoney(+e?.price)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="table_wrapper">
              <th className="table_item"></th>
              <th className="table_item">Jami</th>
              <th className="table_item">
                {formatMoney(
                  treatments?.reduce((a, e) => {
                    return a + +e.technic_price;
                  }, 0)
                )}
              </th>
              <th className="table_item">
                {formatMoney(
                  treatments?.reduce((a, e) => {
                    return a + +e.price;
                  }, 0)
                )}
              </th>
            </tr>
          </tfoot>
        </table>
      </Modal>
    </>
  );
};

export default OrtaTreatmentModal;
