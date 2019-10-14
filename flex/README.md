[TOC]


# flex布局

```css
.f-flex{
  display: flex;
}
```

## 在元素外部处理空间分布
```css
.f-flex-space {
  justify-content: space-between;
}
```
[示例预览](./space.html)

## 让元素自己处理空间分布
```css
.f-flex{
  display: flex;
}

.f-flex-auto > * { 
  flex: auto; 
}
```
[示例预览](./auto.html)

## 拆分导航
```css
.f-flex-right { 
  margin-left: auto; 
}
.f-flex-left { 
  margin-right: auto; 
}
```
[示例预览](./split.html)

## 元素居中
```css
.f-flex-center { 
  align-items: center; 
  justify-content: center; 
}
```
[示例预览](./center.html)

## 绝对底部
```css
.f-flex-footer { 
  flex-direction: column; 
}

.f-flex-footer .f-flex-footer-content { 
  flex: 1 1 auto; 
}
```
[示例预览](./footer.html)

## 媒体对象
```css
.f-flex-media { 
  align-items: flex-start; 
}

.f-flex-media .f-flex-media-content { 
  flex: 1; 
}
```
[示例预览](./media.html)

## form
```css
.f-flex-ctrl .f-flex-ctrl-input { 
  flex: 1 1 auto; 
}
```
[示例预览](./ctrl.html)

## 等高
```css
.f-flex-strength { 
  align-items: stretch; 
}
```
[示例预览](./strength.html)
