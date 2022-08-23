export interface User extends basicTable {
    email?: string
    name1?: string
    name2?: string
    lastName1?: string
    lastName2?: string
    phone1?: string
    phone2?: string
    password?: string
    PrivilegeId?: string
}

export type Sections = {
    _id: string
    name: string
    description: string
    createdAt: Date
    UpdatedAt: Date
}

export interface Privilege extends basicTable {
    name?: string
    permissions?: PermissionsPrivilege[]
}

export interface ITablePropsComponent<T> {
    data?: T[]
    columns: ColumnType<T>[]
    loading?: boolean
    pagination?: false | TablePaginationConfig
    scroll?: RcTableProps<T>['scroll']
    onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[]) => void
    expandedRowRender?: boolean
    summary?: (data: T) => JSX.Element
    aditionalProps?: TableProps
}

export type LayoutProps = {
    children: JSX.Element
    title: string
    getData?: () => void
    create?: JSX.Element
    hideButtons?: boolean
    notShowHeader?: boolean
    layoutMargin?: CSSProperties
}