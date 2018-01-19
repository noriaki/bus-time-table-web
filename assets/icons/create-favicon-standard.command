#!/bin/sh
#このシェルスクリプトを実行した場所をカレントディレクトリにする（お約束）
cd `dirname $0`

# 出力ディレクトリの生成
outdir="favicon"
mkdir -p $outdir

if [ -e "icon_512x512.png" ]; then
    BASE_FILE="icon_512x512.png"    #すべてのアイコンのベースサイズ
else
    if [ -e "icon_256x256.png" ]; then
        BASE_FILE="icon_256x256.png"    #すべてのアイコンのベースサイズ
    else
        echo "素になる大きなサイズのファイルが見つかりません。\n処理を中止します。"
        exit
    fi
fi

# ----------------------------------------------------------------------
# favicon.ico の作成
# ----------------------------------------------------------------------

if [ -e "favicon-48.png" ]; then
    echo "favicon-48.png はすでに存在しています。"
else
    sips -Z 48 ${BASE_FILE} --out favicon-48.png
fi

if [ -e "favicon-32.png" ]; then
    echo "favicon-32.png はすでに存在しています。"
else
    sips -Z 32 ${BASE_FILE} --out favicon-32.png
fi

if [ -e "favicon-16.png" ]; then
    echo "favicon-16.png はすでに存在しています。"
else
    sips -Z 16 ${BASE_FILE} --out favicon-16.png
fi

# favicon.ico の作成
png2ico favicon/favicon.ico favicon-16.png favicon-32.png favicon-48.png

# ----------------------------------------------------------------------
# favicon.png の作成
# ----------------------------------------------------------------------

if [ -e "ifavicon-152.png" ]; then
    echo "favicon-152.png はすでに存在しています。処理をスキップします。"
else
    sips -Z 152 ${BASE_FILE} --out favicon-152.png
fi

cp -vf "favicon-152.png" "${outdir}/favicon-152.png"
