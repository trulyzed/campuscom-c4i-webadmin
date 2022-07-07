import { TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { TransactionQueries } from "~/packages/services/Api/Queries/AdminQueries/Transactions"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const transactionListTableColumns: TableColumnType = [
  {
    title: "Transaction Ref",
    dataIndex: "transaction_ref",
    sorter: (a: any, b: any) => a.transaction_ref - b.transaction_ref
  },
  {
    title: "Store",
    dataIndex: "store",
    sorter: (a: any, b: any) => a.store - b.store
  },
  {
    title: "Order Id",
    dataIndex: "order_id",
    sorter: (a: any, b: any) => a.order_id - b.order_id
  },
  {
    title: "Transaction Date",
    dataIndex: "transaction_date",
    sorter: (a: any, b: any) => a.transaction_date - b.transaction_date
  },
  {
    title: "Purchaser Name",
    dataIndex: "purchaser_name",
    sorter: (a: any, b: any) => a.purchaser_name - b.purchaser_name
  },
  {
    title: "Purchaser Email",
    dataIndex: "purchaser_email",
    sorter: (a: any, b: any) => a.purchaser_email - b.purchaser_email
  },
  {
    title: "Purchaser Phone",
    dataIndex: "purchaser_phone",
    sorter: (a: any, b: any) => a.purchaser_phone - b.purchaser_phone
  },
  {
    title: "Purchaser Country",
    dataIndex: "purchaser_country",
    sorter: (a: any, b: any) => a.purchaser_country - b.purchaser_country
  },
  {
    title: "Purchasing For",
    dataIndex: "purchasing_for",
    sorter: (a: any, b: any) => a.purchasing_for - b.purchasing_for
  },
  {
    title: "Product Type",
    dataIndex: "product_type",
    sorter: (a: any, b: any) => a.product_type - b.product_type
  },
  {
    title: "Organization",
    dataIndex: "organization",
    sorter: (a: any, b: any) => a.organization - b.organization
  },
  {
    title: "Course Provider Price",
    dataIndex: "course_provider_price",
    sorter: (a: any, b: any) => a.course_provider_price - b.course_provider_price
  },
  {
    title: "Store  Price",
    dataIndex: "store_price",
    sorter: (a: any, b: any) => a.store_price - b.store_price
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a: any, b: any) => a.quantity - b.quantity
  },
  {
    title: "Extended Amount",
    dataIndex: "extended_amount",
    sorter: (a: any, b: any) => a.extended_amount - b.extended_amount
  },
  {
    title: "Discount Amount",
    dataIndex: "discount_amount",
    sorter: (a: any, b: any) => a.discount_amount - b.discount_amount
  },
  {
    title: "Discount Code",
    dataIndex: "discount_code",
    sorter: (a: any, b: any) => a.discount_code - b.discount_code
  },
  {
    title: "Sales Tax",
    dataIndex: "sales_tax",
    sorter: (a: any, b: any) => a.sales_tax - b.sales_tax
  },
  {
    title: "Tax Code",
    dataIndex: "tax_code",
    sorter: (a: any, b: any) => a.tax_code - b.tax_code
  },
  {
    title: "Total Amount",
    dataIndex: "total_amount",
    sorter: (a: any, b: any) => a.total_amount - b.total_amount
  },
  {
    title: "Charges of Payment Gateway",
    dataIndex: "charges_of_payment_gateway",
    sorter: (a: any, b: any) => a.charges_of_payment_gateway - b.charges_of_payment_gateway
  },
  {
    title: "Receivable",
    dataIndex: "receivable",
    sorter: (a: any, b: any) => a.receivable - b.receivable
  },
  {
    title: "No Of Students",
    dataIndex: "no_of_students",
    sorter: (a: any, b: any) => a.no_of_students - b.no_of_students
  },
  {
    title: "Student1 Name",
    dataIndex: "student1_name",
    sorter: (a: any, b: any) => a.student1_name - b.student1_name
  },
  {
    title: "Student1 Email",
    dataIndex: "student1_email",
    sorter: (a: any, b: any) => a.student1_email - b.student1_email
  },
  {
    title: "Student1 Products",
    dataIndex: "student1_products",
    sorter: (a: any, b: any) => a.student1_products - b.student1_products
  },
  {
    title: "Student2 Name",
    dataIndex: "student2_name",
    sorter: (a: any, b: any) => a.student2_name - b.student2_name
  },
  {
    title: "Student2 Email",
    dataIndex: "student2_email",
    sorter: (a: any, b: any) => a.student2_email - b.student2_email
  },
  {
    title: "Student2 Products",
    dataIndex: "student2_products",
    sorter: (a: any, b: any) => a.student2_products - b.student2_products
  },
  {
    title: "Student3 Name",
    dataIndex: "student3_name",
    sorter: (a: any, b: any) => a.student3_name - b.student3_name
  },
  {
    title: "Student3 Email",
    dataIndex: "student3_email",
    sorter: (a: any, b: any) => a.student3_email - b.student3_email
  },
  {
    title: "Student3 Products",
    dataIndex: "student3_products",
    sorter: (a: any, b: any) => a.student3_products - b.student3_products
  },
  {
    title: "Student4 Name",
    dataIndex: "student4_name",
    sorter: (a: any, b: any) => a.student4_name - b.student4_name
  },
  {
    title: "Student4 Email",
    dataIndex: "student4_email",
    sorter: (a: any, b: any) => a.student4_email - b.student4_email
  },
  {
    title: "Student4 Products",
    dataIndex: "student4_products",
    sorter: (a: any, b: any) => a.student4_products - b.student4_products
  },
  {
    title: "Student5 Name",
    dataIndex: "student5_name",
    sorter: (a: any, b: any) => a.student5_name - b.student5_name
  },
  {
    title: "Student5 Email",
    dataIndex: "student5_email",
    sorter: (a: any, b: any) => a.student5_email - b.student5_email
  },
  {
    title: "Student5 Products",
    dataIndex: "student5_products",
    sorter: (a: any, b: any) => a.student5_products - b.student5_products
  }
]

export const getTransactionListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: transactionListTableColumns,
    searchFunc: QueryConstructor(
      (params) => TransactionQueries.getPaginatedList(params),
      [TransactionQueries.getPaginatedList]
    ),
    tableName: "Transaction"
  }
}
