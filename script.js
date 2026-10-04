const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ====================
// 要素
// ====================

const sizeInput =
    document.getElementById("size");

const gapInput =
    document.getElementById("gap");

const gridAngleInput =
    document.getElementById("gridAngle");

const shapeAngleInput =
    document.getElementById("shapeAngle");

const gridAngleNumber =
    document.getElementById("gridAngleNumber");

const shapeAngleNumber =
    document.getElementById("shapeAngleNumber");

const randomRotationInput =
    document.getElementById("randomRotation");

const randomRotationValue =
    document.getElementById("randomRotationValue");

const colorInput =
    document.getElementById("color");

const colorOpacityInput =
    document.getElementById("colorOpacity");

const colorOpacityValue =
    document.getElementById("colorOpacityValue");

const shapeOpacityInput =
    document.getElementById("shapeOpacity");

const shapeOpacityValue =
    document.getElementById("shapeOpacityValue");

const canvasWidthInput =
    document.getElementById("canvasWidth");

const canvasHeightInput =
    document.getElementById("canvasHeight");

const downloadButton =
    document.getElementById("download");

const shapePalette =
    document.getElementById("shapePalette");

const addImageButton =
    document.getElementById("addImageButton");

const imageInput =
    document.getElementById("imageInput");

const patternBackgroundInput =
    document.getElementById("patternBackground");

const transparentBackgroundButton =
    document.getElementById("transparentBackground");

let transparentBackground = true;

const backgroundImageInput =
    document.getElementById("backgroundImageInput");

const backgroundImageOpacityInput =
    document.getElementById("backgroundImageOpacity");

const backgroundImageOpacityValue =
    document.getElementById("backgroundImageOpacityValue");

const removeBackgroundImage =
    document.getElementById(
        "removeBackgroundImage"
    );


// ====================
// 現在の図形
// ====================

let currentShape = "circle";

// 追加画像
let customImages = [];

// 背景画像
let backgroundImage = null;

// 背景画像専用Canvas
const backgroundCanvas =
    document.createElement("canvas");

const backgroundCtx =
    backgroundCanvas.getContext("2d");

const patternCanvas =
    document.createElement("canvas");

const patternCtx =
    patternCanvas.getContext("2d");

function updateBackgroundCanvas() {

    if (!backgroundImage) return;

    backgroundCanvas.width =
        canvas.width;

    backgroundCanvas.height =
        canvas.height;

    backgroundCtx.clearRect(
        0,
        0,
        backgroundCanvas.width,
        backgroundCanvas.height
    );

    const imageWidth =
        backgroundImage.naturalWidth;

    const imageHeight =
        backgroundImage.naturalHeight;

    const scale =
        Math.min(
            backgroundCanvas.width / imageWidth,
            backgroundCanvas.height / imageHeight
        );

    const width =
        imageWidth * scale;

    const height =
        imageHeight * scale;

    const x =
        (backgroundCanvas.width - width) / 2;

    const y =
        (backgroundCanvas.height - height) / 2;

    backgroundCtx.drawImage(
        backgroundImage,
        x,
        y,
        width,
        height
    );
}

function setCanvasSize() {

    const canvasWidth =
        parseInt(canvasWidthInput.value);

    const canvasHeight =
        parseInt(canvasHeightInput.value);


    // 表示用Canvas
    canvas.width =
        canvasWidth;

    canvas.height =
        canvasHeight;


    // 背景画像用Canvas
    backgroundCanvas.width =
        canvasWidth;

    backgroundCanvas.height =
        canvasHeight;


    // パターン用Canvas
    patternCanvas.width =
        canvasWidth;

    patternCanvas.height =
        canvasHeight;


    // 背景画像がある場合は更新
    if (backgroundImage) {
        updateBackgroundCanvas();
    }
}

function drawBackground() {

    // Canvasをクリア
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ====================
    // 透明時は市松模様
    // ====================

    if (transparentBackground) {

        canvas.classList.add(
            "transparent"
        );

    } else {

        canvas.classList.remove(
            "transparent"
        );
    }


    // ====================
    // 背景色
    // ====================

    if (!transparentBackground) {

        ctx.fillStyle =
            patternBackgroundInput.value;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    }


    // ====================
    // 背景画像
    // ====================

    if (backgroundImage) {

        const opacity =
            parseInt(
                backgroundImageOpacityInput.value
            ) / 100;

        ctx.save();

        ctx.globalAlpha =
            opacity;

        ctx.drawImage(
            backgroundCanvas,
            0,
            0
        );

        ctx.restore();
    }
}

// ====================
// 設定保存
// ====================

const SETTINGS_KEY =
    "patternGeneratorSettings";

function saveSettings() {

    const settings = {

        size:
            sizeInput.value,

        gap:
            gapInput.value,

        gridAngle:
            gridAngleInput.value,

        shapeAngle:
            shapeAngleInput.value,

        randomRotation:
            randomRotationInput.value,

        color:
            colorInput.value,

        patternBackground:
            patternBackgroundInput.value,

        canvasWidth:
            canvasWidthInput.value,

        canvasHeight:
            canvasHeightInput.value,

        backgroundImageOpacity:
            backgroundImageOpacityInput.value,

        transparentBackground:
            transparentBackground,

        colorOpacity:
            colorOpacityInput.value,

        shapeOpacity:
            shapeOpacityInput.value,

        currentShape:
            currentShape,
    };


    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );
}

function loadSettings() {

    const saved =
        localStorage.getItem(
            SETTINGS_KEY
        );

    if (!saved) return;


    const settings =
        JSON.parse(saved);


    if (settings.size !== undefined)
        sizeInput.value =
            settings.size;

    if (settings.gap !== undefined)
        gapInput.value =
            settings.gap;

    if (settings.gridAngle !== undefined)
        gridAngleInput.value =
            settings.gridAngle;

    if (settings.shapeAngle !== undefined)
        shapeAngleInput.value =
            settings.shapeAngle;

    if (settings.randomRotation !== undefined)
        randomRotationInput.value =
            settings.randomRotation;

    if (settings.color !== undefined)
        colorInput.value =
            settings.color;

    if (settings.patternBackground !== undefined)
        patternBackgroundInput.value =
            settings.patternBackground;

    if (settings.canvasWidth !== undefined)
        canvasWidthInput.value =
            settings.canvasWidth;

    if (settings.canvasHeight !== undefined)
        canvasHeightInput.value =
            settings.canvasHeight;

    if (settings.backgroundImageOpacity !== undefined)
        backgroundImageOpacityInput.value =
            settings.backgroundImageOpacity;

    if (settings.transparentBackground !== undefined)
        transparentBackground =
            settings.transparentBackground;

    if (settings.colorOpacity !== undefined)
        colorOpacityInput.value =
            settings.colorOpacity;

    if (settings.shapeOpacity !== undefined)
        shapeOpacityInput.value =
            settings.shapeOpacity;

    if (
        settings.currentShape === "circle" ||
        settings.currentShape === "square" ||
        settings.currentShape === "heart" ||
        settings.currentShape === "star" ||
        settings.currentShape === "triangle"
    ) {
        currentShape =
            settings.currentShape;
    } else {
        currentShape = "circle";
    }
}


// ====================
// 図形描画
// ====================

function drawShape(drawCtx, size, shape) {

    drawCtx.beginPath();


    // ====================
    // 丸
    // ====================

    if (shape === "circle") {

        drawCtx.arc(
            0,
            0,
            size / 2,
            0,
            Math.PI * 2
        );

        drawCtx.fill();

        return;
    }


    // ====================
    // 四角
    // ====================

    if (shape === "square") {

        drawCtx.rect(
            -size / 2,
            -size / 2,
            size,
            size
        );

        drawCtx.fill();

        return;
    }


    // ====================
    // ハート
    // ====================

    if (shape === "heart") {

        const s = size / 2;

        drawCtx.moveTo(0, s);

        drawCtx.bezierCurveTo(
            -s * 0.15,
            s * 0.75,
            -s,
            s * 0.15,
            -s,
            -s * 0.3
        );

        drawCtx.bezierCurveTo(
            -s,
            -s * 0.85,
            -s * 0.25,
            -s,
            0,
            -s * 0.35
        );

        drawCtx.bezierCurveTo(
            s * 0.25,
            -s,
            s,
            -s * 0.85,
            s,
            -s * 0.3
        );

        drawCtx.bezierCurveTo(
            s,
            s * 0.15,
            s * 0.15,
            s * 0.75,
            0,
            s
        );

        drawCtx.closePath();

        drawCtx.fill();

        return;
    }


    // ====================
    // 星
    // ====================

    if (shape === "star") {

        const outerRadius = size / 2;
        const innerRadius = outerRadius * 0.4;

        const points = 5;

        for (let i = 0; i < points * 2; i++) {

            const radius =
                i % 2 === 0
                    ? outerRadius
                    : innerRadius;

            const angle =
                -Math.PI / 2 +
                i * Math.PI / points;

            const x =
                Math.cos(angle) * radius;

            const y =
                Math.sin(angle) * radius;


            if (i === 0) {
                drawCtx.moveTo(x, y);
            } else {
                drawCtx.lineTo(x, y);
            }
        }

        drawCtx.closePath();

        drawCtx.fill();

        return;
    }


    // ====================
    // 三角形
    // ====================

    if (shape === "triangle") {

        const radius = size / 2;

        for (let i = 0; i < 3; i++) {

            const angle =
                -Math.PI / 2 +
                i * Math.PI * 2 / 3;

            const x =
                Math.cos(angle) * radius;

            const y =
                Math.sin(angle) * radius;


            if (i === 0) {
                drawCtx.moveTo(x, y);
            } else {
                drawCtx.lineTo(x, y);
            }
        }

        drawCtx.closePath();

        drawCtx.fill();

        return;
    }


    // ====================
    // 追加画像
    // ====================

    if (shape.startsWith("image-")) {
        const index = parseInt(shape.replace("image-", ""));
        const image = customImages[index];
        if (!image) return;

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        if (imageWidth <= 0 || imageHeight <= 0) {
            return;
        }

        let width;
        let height;

        if (imageWidth >= imageHeight) {
            width = size;
            height = size * imageHeight / imageWidth;
        } else {
            height = size;
            width = size * imageWidth / imageHeight;
        }

        drawCtx.save();

        // 元画像
        drawCtx.drawImage(
            image,
            -width / 2,
            -height / 2,
            width,
            height
        );

        // 色を重ねる
        drawCtx.globalCompositeOperation = "source-atop";
        drawCtx.globalAlpha =
            parseInt(colorOpacityInput.value) / 100;

        drawCtx.fillStyle = colorInput.value;

        drawCtx.fillRect(
            -width / 2,
            -height / 2,
            width,
            height
        );

        // 元に戻す
        drawCtx.restore();

        return;
    }
}


// ====================
// 描画
// ====================

// ====================
// 描画
// ====================

function draw() {

    // ====================
    // パターンCanvasのサイズ
    // ====================

    patternCanvas.width =
        canvas.width;

    patternCanvas.height =
        canvas.height;


    // パターンCanvasをクリア
    patternCtx.clearRect(
        0,
        0,
        patternCanvas.width,
        patternCanvas.height
    );


    // ====================
    // パターン設定
    // ====================

    const size =
        parseInt(sizeInput.value);

    const gap =
        parseInt(gapInput.value);

    const gridAngle =
        parseInt(gridAngleInput.value)
        * Math.PI / 180;

    const shapeAngle =
        parseInt(shapeAngleInput.value)
        * Math.PI / 180;

    const randomAmount =
        parseInt(randomRotationInput.value)
        / 100;

    const color =
        colorInput.value;


    // ====================
    // 並び角度
    // ====================

    const cos =
        Math.cos(gridAngle);

    const sin =
        Math.sin(gridAngle);


    // ====================
    // パターンの色
    // ====================

    const colorOpacity =
        parseInt(
            colorOpacityInput.value
        ) / 100;

    patternCtx.globalAlpha =
        colorOpacity;

    patternCtx.fillStyle =
        color;


    // キャンバス中央
    const cx =
        patternCanvas.width / 2;

    const cy =
        patternCanvas.height / 2;


    // ====================
    // パターン生成
    // ====================

    const maxX =
        Math.ceil(patternCanvas.width / gap);

    const maxY =
        Math.ceil(patternCanvas.height / gap);

    for (
        let ix = -maxX;
        ix <= maxX;
        ix++
    ) {

        for (
            let iy = -maxY;
            iy <= maxY;
            iy++
        ) {

            const x = ix * gap;
            const y = iy * gap;

            // 並びを回転
            const rx =
                x * cos -
                y * sin;

            const ry =
                x * sin +
                y * cos;


            patternCtx.save();


            // 図形の位置
            patternCtx.translate(
                cx + rx,
                cy + ry
            );


            // ====================
            // 図形角度
            // ====================

            let rotation =
                shapeAngle;


            // ランダム回転
            rotation +=
                (Math.random() * 2 - 1)
                * Math.PI
                * randomAmount;


            patternCtx.rotate(
                rotation
            );


            // ====================
            // 図形の透明度
            // ====================

            if (
                currentShape.startsWith(
                    "image-"
                )
            ) {

                patternCtx.globalAlpha =
                    parseInt(
                        shapeOpacityInput.value
                    ) / 100;

            } else {

                patternCtx.globalAlpha =
                    parseInt(
                        colorOpacityInput.value
                    ) / 100;
            }


            // ====================
            // 図形を描画
            // ====================

            drawShape(
                patternCtx,
                size,
                currentShape
            );


            patternCtx.restore();
        }
    }


    // ====================
    // 背景＋パターンを表示
    // ====================

    drawBackground();

    ctx.drawImage(
        patternCanvas,
        0,
        0
    );
}


// ====================
// 図形選択
// ====================

function selectShape(button, shape) {

    currentShape =
        shape;


    // 選択状態をリセット
    document
        .querySelectorAll(".shape-button")
        .forEach(button => {

            button.classList.remove(
                "selected"
            );

        });


    // 選択中の図形を強調
    button.classList.add(
        "selected"
    );


    draw();
}


// ====================
// 図形パレット
// ====================

shapePalette.addEventListener(
    "click",
    event => {

        const deleteButton =
            event.target.closest(".delete-image");

        // 画像削除
        if (deleteButton) {

            const button =
                deleteButton.closest(".image-button");

            const shape =
                button.dataset.shape;

            const index =
                parseInt(
                    shape.replace("image-", "")
                );

            // 画像を削除
            customImages[index] = null;

            // ボタンを削除
            button.remove();

            // 削除した画像が現在選択中なら円に戻す
            if (currentShape === shape) {

                const selectedButton =
                    shapePalette.querySelector(
                        `[data-shape="${currentShape}"]`
                    );

                if (selectedButton) {
                    selectedButton.classList.add(
                        "selected"
                    );
                }
            }

            draw();

            return;
        }


        const button =
            event.target.closest(
                ".shape-button"
            );

        if (!button) return;


        // ＋ボタン
        if (
            button ===
            addImageButton
        ) {

            imageInput.click();

            return;
        }


        const shape =
            button.dataset.shape;

        selectShape(
            button,
            shape
        );
    }
);


// ====================
// 画像追加
// ====================

imageInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (!file) return;


        const image =
            new Image();


        image.onload = () => {

            const index =
                customImages.length;


            // 画像を保存
            customImages.push(
                image
            );


            // ====================
            // パレットボタン作成
            // ====================

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "shape-button image-button";

            const deleteButton =
                document.createElement("span");

            deleteButton.className =
                "delete-image";

            deleteButton.textContent =
                "×";

            button.appendChild(
                deleteButton
            );

            button.dataset.shape =
                "image-" + index;


            // サムネイル
            const thumbnail =
                document.createElement(
                    "img"
                );

            thumbnail.src =
                image.src;


            button.appendChild(
                thumbnail
            );

            button.appendChild(
                deleteButton
            );

            // ＋の前に追加
            shapePalette.insertBefore(
                button,
                addImageButton
            );


            // 追加した画像を選択
            selectShape(
                button,
                "image-" + index
            );
        };


        image.src =
            URL.createObjectURL(file);


        // 同じ画像をもう一度選べるようにする
        imageInput.value = "";
    }
);


// ====================
// リアルタイム更新
// ====================

const controls = [
    sizeInput,
    gapInput,
    gridAngleInput,
    shapeAngleInput,
    randomRotationInput,
    colorInput,
    colorOpacityInput,
    shapeOpacityInput,
    patternBackgroundInput,
    backgroundImageOpacityInput,
    canvasWidthInput,
    canvasHeightInput
];

controls.forEach(control => {

    control.addEventListener(
        "input",
        () => {

            // パターン背景色を変更したら透明解除
            if (control === patternBackgroundInput) {
                transparentBackground = false;
            }


            // Canvasサイズが変更されたときだけ
            // Canvasサイズを更新
            if (
                control === canvasWidthInput ||
                control === canvasHeightInput
            ) {
                setCanvasSize();
            }


            gridAngleNumber.value =
                gridAngleInput.value;

            shapeAngleNumber.value =
                shapeAngleInput.value;

            randomRotationValue.textContent =
                randomRotationInput.value + "%";

            colorOpacityValue.textContent =
                colorOpacityInput.value + "%";

            shapeOpacityValue.textContent =
                shapeOpacityInput.value + "%";


            draw();

            saveSettings();
        }
    );
});

transparentBackgroundButton.addEventListener(
    "click",
    () => {

        transparentBackground = true;

        draw();
    }
);

// ====================
// 数字入力 → スライダー
// ====================

gridAngleNumber.addEventListener(
    "input",
    () => {

        let value =
            parseInt(
                gridAngleNumber.value
            );

        if (isNaN(value)) return;


        value =
            Math.max(
                0,
                Math.min(
                    360,
                    value
                )
            );


        gridAngleInput.value =
            value;

        draw();
    }
);


shapeAngleNumber.addEventListener(
    "input",
    () => {

        let value =
            parseInt(
                shapeAngleNumber.value
            );

        if (isNaN(value)) return;


        value =
            Math.max(
                0,
                Math.min(
                    360,
                    value
                )
            );


        shapeAngleInput.value =
            value;

        draw();
    }
);

removeBackgroundImage.addEventListener(
    "click",
    () => {

        backgroundImage = null;

        backgroundImageInput.value = "";

        backgroundCtx.clearRect(
            0,
            0,
            backgroundCanvas.width,
            backgroundCanvas.height
        );

        draw();
    }
);

// ====================
// 背景画像
// ====================

backgroundImageInput.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (!file) return;


        const image =
            new Image();


        image.onload = () => {

            backgroundImage =
                image;

            // 背景画像のサイズをCanvasサイズにする
            canvasWidthInput.value =
                image.naturalWidth;

            canvasHeightInput.value =
                image.naturalHeight;

            transparentBackground =
                false;

            canvas.classList.remove(
                "transparent"
            );

            // Canvasサイズを反映
            setCanvasSize();

            // 背景画像を準備
            updateBackgroundCanvas();

            draw();
        };

        image.src =
            URL.createObjectURL(file);
    }
);

backgroundImageOpacityInput.addEventListener(
    "input",
    () => {

        backgroundImageOpacityValue.textContent =
            backgroundImageOpacityInput.value + "%";

        draw();
    }
);

// ====================
// PNG保存
// ====================

downloadButton.addEventListener(
    "click",
    () => {

        const link =
            document.createElement("a");


        link.download =
            "pattern.png";


        link.href =
            canvas.toDataURL(
                "image/png"
            );


        link.click();
    }
);

// ====================
// 設定リセット
// ====================

const resetSettingsButton =
    document.getElementById("resetSettings");

resetSettingsButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            SETTINGS_KEY
        );

        location.reload();
    }
);


// ====================
// 初期表示
// ====================

const circleButton =
    shapePalette.querySelector(
        '[data-shape="circle"]'
    );


// 保存した設定を読み込む
loadSettings();


// 表示を保存設定に合わせる
if (circleButton) {
    circleButton.classList.add(
        "selected"
    );
}

loadSettings();

gridAngleNumber.value =
    gridAngleInput.value;

shapeAngleNumber.value =
    shapeAngleInput.value;

randomRotationValue.textContent =
    randomRotationInput.value + "%";

colorOpacityValue.textContent =
    colorOpacityInput.value + "%";

shapeOpacityValue.textContent =
    shapeOpacityInput.value + "%";

backgroundImageOpacityValue.textContent =
    backgroundImageOpacityInput.value + "%";


// Canvasサイズを反映
setCanvasSize();


// 描画
draw();